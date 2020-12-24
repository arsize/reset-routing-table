import os;
val = os.system('npm run reset && git add .');
if val == 0:
    print('success!')
else:
    print('error!')
