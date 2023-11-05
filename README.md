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

To run the project, we enter the word **csv_reconciler** on the terminal

```bash
csv_reconciler -h
```

Output 
```bash
Usage: index [options] [command]

Options:
  -h, --help           display help for command

Commands:
  csv_reconciler       Reconcile between source and target csv files   
  help [command]       display help for command
```

#### Basic Operations

1. Reconcile between source and target csv files 
```bash
csv_reconciler reconcile <source> <target> <output>
```

#### Run app 
```bash
csv_reconciler reconcile source.csv target.csv reconciliation_report.csv
```
