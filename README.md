# docker-swarm-blue-green
A sample project to test Docker Swarm and blue-green deployment model

## Prerequisites
- A Docker Swarm setup with at least two machines

## Setup green and blue machine
Execute `docker node update --label-add environment=green` on one machine and `docker node update --label-add environment=blue` on the other, in order to differentiate the environments and make sure deployments are split correctly between the two

## Deploy the stack
`docker stack deploy --compose-file docker-stack.yml swarm-test`