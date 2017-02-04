#!/bin/sh

docker build load-balancer -t cecchisandrone/swarm-lb:0.0.1
docker push cecchisandrone/swarm-lb:0.0.1
docker build swarm-backend -t cecchisandrone/swarm-backend:0.0.1
docker push cecchisandrone/swarm-backend:0.0.1