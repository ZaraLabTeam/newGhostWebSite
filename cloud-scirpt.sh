echo "########################################################################"
echo "################## CLOUDSTRAP AUTO MERGE SCRIPT ########################"
echo "########################################################################"
echo ""

read -p "Enter the remote name for the github remote: " github

echo "Fetching data from github"
git fetch $github

echo "EXcluding changes to content/themes/zaralab/.gitignore and merging"
git merge --no-ff --no-commit $github/master
git checkout master content/themes/zaralab/.gitignore

echo "Committing changes"
git commit -m "Merged github repository to cloudstrap"

echo "Starting gulp task to build assets"
cd content/themes/zaralab/
gulp build

echo "Committing changes"
cd ../../../
git add .
git commit -m "Rebuilt the assets folder"

echo ""
echo "########################################################################"
echo ""

echo "All done..." 
echo ""
echo "...You still need to push the changes with 'git push'"
