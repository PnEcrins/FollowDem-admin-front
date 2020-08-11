# FollowDem Admin

Simple Dashboard Admin App built using Angular 6 and Bootstrap 4


# Installation

1. ##### Installer Node Version Manager (NVM)

   ```
   wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.6/install.sh | bash
   export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
   nvm install 10
   ```

2. ##### Installer AngularCli et les node ModulesInstaller AngularCli et les node Modules

   ```
   npm i @angular/cli
   npm install 
   ```



# Configuration

1. ##### Copier le template du ficher settings

   ```
   cp src/app/settings.ts.tpl src/app/settings.ts.tpl
   ```

2. ##### Edit le ficheir et renseigner les paramètres selon votre contexte



# build app

```
ng build --prod --base-href <your base url for the application being built>
```

> *L'option --base-href permet de configurer l'url de l'application*



## Mode developpement

```
ng serve
```



