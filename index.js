const { exec } = require("child_process");
const fs = require("fs");

// 写入 v2ray 配置文件
const config = {
  "inbounds": [{
    "port": process.env.PORT || 3000,
    "protocol": "vmess",
    "settings": {
      "clients": [{
        "id": "73e33077-e207-4fdd-8313-fba81496dac8",
        "alterId": 0
      }]
    },
    "streamSettings": {
      "network": "ws",
      "wsSettings": {
        "path": "/ray"
      }
    }
  }],
  "outbounds": [{
    "protocol": "freedom",
    "settings": {}
  }]
};

fs.writeFileSync("config.json", JSON.stringify(config, null, 2));

// 下载并启动 v2ray
exec("wget https://github.com/v2fly/v2ray-core/releases/latest/download/v2ray-linux-64.zip && unzip v2ray-linux-64.zip -d v2ray && chmod +x v2ray/v2ray && ./v2ray/v2ray run -config=config.json", (err, stdout, stderr) => {
  if (err) {
    console.error(`exec error: ${err}`);
    return;
  }
  console.log(stdout);
});
