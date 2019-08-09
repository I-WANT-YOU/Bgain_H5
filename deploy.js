const { spawn } = require('child_process');

const scp = spawn(
  'scp',
  [
    '-r',
    'dist/',
    'root@fb-dev:/root/mobile/dist',
  ],
  { stdio: 'inherit' },
);

scp.on('close', (code) => {
  if (!code) {
    process.stdout.write('恭喜你，部署成功！');
  }
});
