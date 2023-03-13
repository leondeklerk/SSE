# SSE
Repo for Sustainable Software Engineering 2023 (TU Delft)
This repository contains scripts and files to run a power consumption experiment for 4 different container runtimes: Docker, Podman, Containerd, and LXC.

To achieve this the `run.py` script runs Selenium end-to-end tests on a preconfigured webstack (Front-end + database + proxy). 
Before running the tests for a specific the runtime service is enabled, and after the test the service is disabled again to prevent interference of the different runtimes.

The power consumption is measured with Powertop and reported in Watt and Joule means.

## Reproduce

The files were tested on Ubuntu LTS 22.04 and requires the following packages:
`docker`, `docker-compose`, `powertop`, `podman`, `podman-compose`, `python3`, `chrome`, `nerdctl`, `containerd`, `selenium`, `plumbum`.
Some packages can be installed via apt, while others can be installed via pip or their respective repo.

For our experiment we disabled TurboBoost on the CPU, set screen to full brightness and disabled sleep.
The experiment requires a Laptop running on battery power.

### LXC/LXD setup
Install: `sudo snap install lxd`
Init: `sudo lxd init` (leave defaults)

Setup: `sudo lxc image copy images:alpine/edge local: --alias alpine`

### Run

Make sure all services are disabled before running: `systemctl stop` + `docker`/`podman`/`containerd` and `snap stop lxd.daemon`
From the folder run `sudo python3 run.py`