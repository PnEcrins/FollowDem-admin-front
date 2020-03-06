============
INSTALLATION
============
.. image:: http://geonature.fr/img/logo-pne.jpg
    :target: http://www.ecrins-parcnational.fr


Installation de l'application
=========================================

**1. Configuration de l'application :**

Copier et éditer le fichier de configuration ``./src/app/settings.ts.tpl``.

::

 cp ./src/app/settings.ts.tpl ./src/app/settings.ts

- Vérifier que la variable 'serverURL' contient les bonnes informations de connexion a l' API
- 'APP_FLW_ID' corrsepond à l'id de l'application usersHub


**2. installer l'application :**

::

  npm install


Mode developpement
=========================================

** Lancer l'application en mode dev :**

::

    ng serve


** build app :**

::

    ng build --prod 
