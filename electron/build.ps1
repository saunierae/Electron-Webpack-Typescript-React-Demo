cd ..\web\
yarn build
cd ..\electron
remove-item dist -recurse
yarn build
cp -R ..\web\dist\ .\dist\web
cp ..\web\src\components\Styles.css .\dist\web\Styles.css
yarn launch-electron