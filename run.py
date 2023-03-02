from plumbum.cmd import nerdctl, docker_compose, powertop, grep, systemctl, podman_compose, python, sudo, sh
import numpy as np
from pprint import pprint
import multiprocessing

RUNS=10
TIME=20

def parse_powertop_csv():
    watts = float(grep("discharge", "powertop.csv").split("  ")[1])
    jouls = float(grep("consumed", "powertop.csv").split("  ")[1])
    return watts, jouls

def get_power_data():
    t = multiprocessing.Process(target=lambda: python("tests.py"), args=())
    t.start()
    sudo("powertop", "-C", "-t", "20")
    return parse_powertop_csv()


def run_docker():
    docker_compose("build")
    docker_compose("up", "-d")
    data = get_power_data()
    docker_compose("down")
    return data

def run_podman():
    podman_compose("build")
    podman_compose("up", "-d")
    data = get_power_data()
    podman_compose("down")
    return data

def run_lxc():
    t = multiprocessing.Process(target=lambda: sh("setup_environment.sh"), args=())
    t.start()
    data = get_power_data()
    t.terminate()
    return data

def run_containerd():
    nerdctl("compose", "-f", "docker-compose.yml", "up", "-d")
    data = get_power_data()
    nerdctl("compose", "down")
    return data
    
def get_means(data):
    watts = list(map(lambda x: x[0], data))
    jouls = list(map(lambda x: x[1], data))
    rnd = lambda x: np.round(np.mean(x), 2)
    return rnd(watts), rnd(jouls)

def run():
    results = {}
    for name, f in [("baseline", get_power_data), ("docker", run_docker), ("containerd", run_containerd),
                    ("podman", run_podman), ("lxc", run_lxc)]:
        results[name] = []
        print(f"=======\n{name}\n=======")
        if name != "baseline":
            systemctl("start", name)
        for _ in range(RUNS):
            results[name].append(f())
        if name != "baseline":
            systemctl("stop", name)

        
        means = get_means(results[name])
        print(f"Mean watts: {means[0]}")
        print(f"Mean joules: {means[1]}")
        
    pprint(results)
        
if __name__ == "__main__":
    run()
