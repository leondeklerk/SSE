# Work plan group 10

The general work plan for project 1.

## Idea

We want to run multiple images in different container runtimes, comparing the energy usage of the same images in different environments.
In this case, we want to compare Docker, Podman, LXC, and Containerd.

## Expectation

Docker itself can use Containerd as a subtool, so in that case, Docker is likely to introduce more overhead.
Compared to Podman, Docker uses more threads and a separate daemon for each process. LXC uses a more native implementation and requires less virtualization than for example, Docker.
This means that Docker most likely introduces the most overhead compared to the other solutions, and therefore also uses the most energy.

## Environment setup

As all runtime environments support Linux we need to run everything on Linux (Ubuntu)

- Install Docker, Containerd, LXC, and Podman
- Disable all services so no different environments interfere
- On the host system (laptop):
	- Disable turbo-boost on the CPU to ensure similar speeds
	- Set screen brightness to a known value (max)
	- Plug in the power cable
- Create three different images for every runtime environment:
	- Database (MYSQL)
	- Website (WordPress)
		- Use a standard template
	- Reverse proxy (Nginx)
- Install powertop
- Create a testing flow for the web app

## Measurement execution

- For the different types of runtime environments
	- Enable the service
	- Install the three containers
	- Start powertop
	- Open the web app (WordPress)
	- Execute the testing flow.
	- stop powertop
	- store results
	- disable service

## Automation
Automation requires the following (extra) steps;
- Setup environment with a shell script
- Install cypress
- Convert the testing flow to a cypress testing script.
- Convert the Measurement execution step to a script
- Replace the manual execution of the test flow with the cypress script.

## Report
Parts of the report:

- Introduction with expectation
- Describe the environment setup
- Describe measurement execution
- Display results
	- convert the data into tables and/or diagrams
- Conclusion
- Discussion

## Deliverables meeting 03/03/2023
- Scripts for experiment execution
- Results of the experiment
- General outline of the report with key points
	- Most important: the results and the discussion points