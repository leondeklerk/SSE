# SSE
Repo for Sustainable Software Engineering 2023 (TU Delft)

Up: `docker compose up -d`
Down: `docker compose down`

Selenium: `pip install -U selenium`


## LXC/LXD
Install: `sudo snap install lxd`
Init: `sudo lxd init` (leave defaults)

Setup: `sudo lxc image copy images:alpine/edge local: --alias alpine`
Run: `sudo ./setup_environment.sh`
Cleanup: `sudo lxc stop demo && sudo lxc rm demo`