RMDIR "archives" /S /Q
mkdir archives
"C:\Program Files\7-Zip\7z" a archives/static.zip ./templates/static/*
copy templates/list.json archives/list.json

pscp -r C:\Users\bojan\WebstormProjects\cloudapps\archives\ root@cdn.cloudapps.io:/var/www/cdn.cloudapps.io/cloudapps-cli-templates/
rclone sync archives/ space:cloudapps/cloudapps-cli-templates/ --retries 1
