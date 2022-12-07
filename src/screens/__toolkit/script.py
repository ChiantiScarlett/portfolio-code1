"""
기본 페이지 뼈대를 생성하기 위한 툴킷입니다.
sample.js와 동일한 파일을 생성하되, 페이지 번호만 변경합니다.
"""

import os

EXCLUDE = ['P001', 'P002', 'P013']


def main():
    for i in range(1, 90+1):
        page_name = f'P{("00"+str(i))[-3:]}'

        with open('sample.js', 'r') as fp:
            data = fp.read()
        data = data.replace('P001', page_name)

        os.mkdir(page_name)
        with open(f'{page_name}/index.js', 'w') as fp:
            fp.write(data)


if __name__ == "__main__":
    main()
