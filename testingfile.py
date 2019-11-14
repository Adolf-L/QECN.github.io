import os, re

filepath = './index copy.html'

data = ''
count = 0
with open(filepath, 'r+') as f:
    pattern = re.compile(r'BIGLUO')
    replacecontent = r'BBBBBBBBBBBB'

    for line in f.readlines(): 
    
        newline = pattern.sub(replacecontent, line)
    #    global count
        count += 1
        print(f'替换:{count}次，内容是:{newline}')
        data += newline
        

with open(filepath, 'r+') as f:
    f.writelines(data)
    print('修改完成已保存！')

    
