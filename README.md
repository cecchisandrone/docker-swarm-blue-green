# docker-swarm-blue-green
A sample project to test Docker Swarm and blue-green deployment model

## Prerequisites
- A Docker Swarm setup with at least two machines

## Setup green and blue machine
Execute `docker node update --label-add environment=green` on one machine and `docker node update --label-add environment=blue` on the other, in order to differentiate the environments and make sure deployments are split correctly between the two

## Deploy the stack
Run `docker stack deploy --compose-file docker-stack.yml swarm-test`
You will have the following endpoints:
- node_ip:8080 - Visualization of the Swarm deployment
- node_ip:80 - Load balancer

## How to test the deployment and load balancing switch
If you run the `request.sh` on one of the nodes, you will have the following result:

````
Request number: 1 served by 79b0dcf9963b - GREEN
Request number: 2 served by 79b0dcf9963b - GREEN

````

Now run the following command in order to update the swarm-lb service:

````
docker service update --env-add ACTIVE_BACKEND=swarm-backend-blue --env-add BACKUP_BACKEND=swarm-backend-green swarm-test_swarm-lb
````

You will have the following output in the console:

````
Request number: 313 served by 79b0dcf9963b - GREEN
Request number: 314 served by 79b0dcf9963b - GREEN
Request number: 315 served by 79b0dcf9963b - GREEN
Request number: 1 served by abd5896fd6fe - BLUE
Request number: 316 served by 79b0dcf9963b - GREEN
Request number: 2 served by abd5896fd6fe - BLUE
Request number: 317 served by 79b0dcf9963b - GREEN
Request number: 3 served by abd5896fd6fe - BLUE
Request number: 4 served by abd5896fd6fe - BLUE
Request number: 5 served by abd5896fd6fe - BLUE
Request number: 6 served by abd5896fd6fe - BLUE
Request number: 7 served by abd5896fd6fe - BLUE
````

Obviously there is a timeframe in which both blue and green are receiving requests. This because I set parallelism to one in `docker-stack.yml`, in order to avoid losing requests.
