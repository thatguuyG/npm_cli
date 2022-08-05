## Git CLI command line application



## Set up

Clone and cd into the project:

```bash
git clone https://github.com/thatguuyG/npm_cli.git && cd npm-cli

```

Install dependecies:

```bash
npm i
```

If you'd like to install the tool globally on your machine, do

```bash
npm i -g
```

To uninstall the global cli tool:

```bash
npm uninstall -g cli
```

In this case, cli is the name field under package.json


## Run the project

To run the project, we enter the word **todo** on the terminal

```bash
todos -h
```

Output 
```bash
Usage: index [options] [command]

Options:
  -h, --help           display help for command

Commands:
  list                 List all the TODO tasks 
  add <task>           Add a new TODO task     
  mark-done [options]  Mark commands done      
  help [command]       display help for command
```

#### Basic Operations

1. List all todo items
```bash
todos list
```
2. Add a new todo task
```bash
todos add <task>
```

3. Add a new todo task
```bash
todos mark-done --tasks <taskNo>
```
