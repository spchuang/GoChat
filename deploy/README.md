Setup server
```
> ansible-playbook -i inventories/production.ini playbooks/app.yml
```

Deploy app
```
> ansible-playbook -i inventories/production.ini playbooks/deploy.yml
```

Setup server (dev)
```
> ansible-playbook -i inventories/dev.ini playbooks/devSetup.yml
```

Deploy app (dev)
```
> ansible-playbook -i inventories/dev.ini playbooks/deploy.yml
```

Add `-vvvv` for verbose output

Install requirements (roles)
```
> ansible-galaxy install -r requirements.yml -p playbooks/roles/
```

Run specific tasks
```
--step --start-at-task=tasknamehere
```

nodejs version not found. Use the following command to see the available versions.
> sudo apt-cache showpkg nodejs
