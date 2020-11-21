

export app_root=/usr/fixel/dashboard
if [ -d "$app_root" ];then
    mkdir -p /usr/fixel/dashboard
else
    mkdir -p /usr/fixel/dashboard
fi



curl -sL https://rpm.nodesource.com/setup_14.x | sudo -E bash -
yum -y install nodejs npm



