from plumbum.cmd import nerdctl, docker, powertop, grep, systemctl, podman_compose, python, sudo, sh
import numpy as np
from pprint import pprint
import multiprocessing
import time

RUNS=10
TIME=20

def parse_powertop_csv():
    watts = float(grep("discharge", "powertop.csv").split("  ")[1])
    jouls = float(grep("consumed", "powertop.csv").split("  ")[1])
    return watts, jouls

def get_power_data(run_tests = False):
    if (run_tests):
        t = multiprocessing.Process(target=lambda: python("tests.py"), args=())
        t.start()
    sudo("powertop", "-C", "-t", "20")
    return parse_powertop_csv()


def run_docker():
    docker("compose", "build")
    docker("compose", "up", "-d")
    time.sleep(5)
    data = get_power_data(True)
    docker("compose", "down")
    return data

def run_podman():
    podman_compose("build")
    podman_compose("-f", "podman-compose.yml", "up", "-d"),
    time.sleep(5)  
    data = get_power_data(True)
    podman_compose("-f", "podman-compose.yml", "down")
    return data

def run_lxc():
    t = multiprocessing.Process(target=lambda: sh("setup_environment.sh"), args=())
    t.start()
    time.sleep(30)
    data = get_power_data(True)
    t.terminate()
    sudo("lxc", "stop", "demo")
    sudo("lxc", "rm", "demo")
    return data

def run_containerd():
    nerdctl("compose", "-f", "docker-compose.yml", "up", "-d")
    time.sleep(5)
    data = get_power_data(True)
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
            if name != "lxc":
                systemctl("start", name)
            else:
                sudo("snap", "start", "lxd.daemon")
        for _ in range(RUNS):
            results[name].append(f())
        if name != "baseline":
            if name != "lxc":
                systemctl("stop", name)
            else:
                sudo("snap", "stop", "lxd.daemon")

        
        means = get_means(results[name])
        print(f"Mean watts: {means[0]}")
        print(f"Mean joules: {means[1]}")
        
    pprint(results)
        
if __name__ == "__main__":
    run()
