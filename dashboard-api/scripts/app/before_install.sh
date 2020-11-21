

export app_root=/usr/fixel/dashboard-api
if [ -d "$app_root" ];then
    rm -rf /usr/fixel/dashboard-api

    mkdir -p /usr/fixel/dashboard-api
    mkdir -p /usr/fixel/dashboard-api
fi


curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
yum -y install nodejs npm
