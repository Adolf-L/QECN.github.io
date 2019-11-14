import os, re

filepath = './index copy.html'

#打开文件的次数
filecount = 0

# 获取到指定目录下面的所有 html 文件。
def get_all_html_files_path():

    count = 0
    htmlfilespath = []

    for (dirpath, dirnames, filenames) in os.walk('.'):
        count += 1
        for filename in filenames:
            # print (filename)
            # print("目录层级: %d 路径：%s 值: %s " % (count, dirpath, filename))
            if '.html' in filename:
                filepath = os.path.join(dirpath, filename)
                htmlfilespath.append(filepath)
    return htmlfilespath

#   获取替换文本
def get_replace_content(picName, originContentGroup):

    originContent = originContentGroup.group()
    print(originContent)
    # 字符串写不下换行 \ () 两种方式。 字符串拼接，格式化方式
    htmlstrline1 = '<source type=images/webp %s' % originContent[5:].replace('.webp','.webp')
    htmlstrline2 = '<source type=images/png %s' % originContent[5:]
    htmlstrline3 = originContent
    htmlstring = '<picture>'+htmlstrline1+htmlstrline2+htmlstrline3+'</picture>'

    return htmlstring

#获取 images 文件夹下面的图片
def get_all_match_images_nosuffix():
    listImageNames = []
    imagespath = './images'
    imgnamesuffix = os.listdir(imagespath)
    for filename in imgnamesuffix:
        listImageNames.append(os.path.splitext(filename)[0])
    setImageNames = set(listImageNames)#通过集合转换重复的图片名称。
    return setImageNames

#获取 images 文件夹下面图片只含有 .webp 格式
def get_all_match_images_png():
    noSuffixImages = get_all_match_images_nosuffix()
    pngImages = map(lambda x: x+'.webp', noSuffixImages)
    listPngImages = list(pngImages)
    listPngImages.sort() #排序操作是本身
    return listPngImages

#优化一个 HTML 文件
def opti_a_htmlfile(aHtmlFilePath):
    data = ''
    allPngImages = get_all_match_images_png()
    
    #逐行检查，替换目标源
    with open(aHtmlFilePath, 'r+') as f:
        for line in f:
            isAddLine = True
            for img in allPngImages:
                imgpstr = '<img src.*' + img + '.*">'
                imgPatternStr = r'' + imgpstr
                originContentGroup = re.search(imgPatternStr, line)
                if originContentGroup:
                    #找到匹配内容进行替换
                    replaceContent = get_replace_content(img, originContentGroup)
                    newContentLine = re.sub(imgPatternStr, replaceContent, line)
                    data += newContentLine
                    isAddLine = False
            if isAddLine:        
                data += line
    f.close()

    with open(aHtmlFilePath, 'r+') as f: #从新打开文件指针回到原始点
        f.writelines(data)
        f.close()
        print(f'已完成{aHtmlFilePath}文件的重写，并保存！')

# 代码运行测试
def run_testing():
   for htmlFilePath in get_all_html_files_path():
       opti_a_htmlfile(htmlFilePath)

run_testing()

