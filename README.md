# Chronicle

## Documentation (Wiki)

The product documentation can be found on [docs.konomi.ai](https://docs.konomi.ai)

## Installation

> The following commands use the compose subcommand from docker. If you do not have it in your Docker client,
> simply run the same command with `docker-compose` instead of `docker compose`.

The entire back-end development environment is powered by Docker. To get started simply run in the project directory:

```
docker compose up -d
```

To stop the server run:

```
docker compose down
```

### I installed new dependencies

If you installed new dependencies, make sure to run this command:

```
docker compose up -V --build
```

This will ensure the new dependencies are installed on the dev image as well

### I want to purge all artifacts

To purge all artifacts related to this project, run:

```
docker compose down -v --rmi all --remove-orphans
```

This will delete everything related to this project from your system. Including upstream images like mongo and node.