let lastSave = new Date().getTime();
const yatzys = JSON.parse(FileStream.read('/sdcard/모주봇/야추정보.json'));
const yatzy = JSON.parse(FileStream.read('/sdcard/모주봇/야추게임.json'));
if (!FileStream.read('/sdcard/모주봇/야추정보.json')) {
    FileStream.write('/sdcard/모주봇/야추정보.json', '{}');
}
if (!FileStream.read('/sdcard/모주봇/야추게임.json')) {
    FileStream.write('/sdcard/모주봇/야추게임.json', '{}');
}
function response(room, msg, sender, isGroupChat, replier, imageDB) {
    const cur = new Date().getTime();
    const id = java.lang.String(imageDB.getProfileImage()).hashCode();
    if (msg === '방등록') {
        if (yatzy[room]) {
            replier.reply('이미 등록한 방입니다');
        } else if (!yatzy[room] || yatzy[room] == null) {
            if (
                java.lang.String(imageDB.getProfileImage()).hashCode() == '791026921' ||
                java.lang.String(imageDB.getProfileImage()).hashCode() == '-1135056852'
            ) {
                replier.reply('등록 완료!');
                yatzy[room] = {
                    player1: {
                        name: '',
                        turn: false,
                        rolls: 3,
                        point: 0,
                        one: '__',
                        two: '__',
                        three: '__',
                        four: '__',
                        five: '__',
                        six: '__',
                        '4card': '__',
                        fh: '__',
                        ss: '__',
                        ls: '__',
                        yatz: '__',
                        ch: '__',
                        bonus: 0,
                        pin1: false,
                        pin2: false,
                        pin3: false,
                    },
                    player2: {
                        name: '',
                        turn: false,
                        rolls: 3,
                        point: 0,
                        one: '__',
                        two: '__',
                        three: '__',
                        four: '__',
                        five: '__',
                        six: '__',
                        '4card': '__',
                        fh: '__',
                        ss: '__',
                        ls: '__',
                        yatz: '__',
                        ch: '__',
                        bonus: 0,
                        pin1: false,
                        pin2: false,
                        pin3: false,
                    },
                    check: false,
                    turns: 0,
                    r: [],
                };
            }
        }
    } //방등록
    if (yatzy[room]) {
        if (yatzy[room].check === false) {
            if (msg === '야추게임참가') {
                if (yatzy[room].player2.name !== '') {
                    replier.reply(
                        '이미 인원이 꽉 찼습니다\n이번 판이 종료된 후에 다시 시도해주세요'
                    );
                    return;
                } else if (
                    sender == yatzy[room].player2.name ||
                    sender == yatzy[room].player1.name
                ) {
                    replier.reply('이미 참여인원이십니다');
                    return;
                } else if (yatzys[sender] && yatzys[sender].id === id) {
                    if (yatzy[room].player1.name === '') {
                        yatzy[room].player1.name = sender;
                        replier.reply(
                            sender + '님 참가 완료!\n참여인원: ' + yatzy[room].player1.name
                        );
                        return;
                    } else if (yatzy[room].player1.name !== '') {
                        yatzy[room].player2.name = sender;
                        replier.reply(
                            sender +
                                '님 참가 완료!\n참여인원: ' +
                                yatzy[room].player1.name +
                                ', ' +
                                yatzy[room].player2.name
                        );
                        yatzy[room].check = true;
                        replier.reply(
                            yatzy[room].player1.name +
                                "님이 '야추게임시작'을 입력할 시 게임이 시작됩니다"
                        );
                        return;
                    }
                } else if (yatzys[sender] && yatzys[sender].id !== id) {
                    let index = sender.length - 1;
                    if (sender[index].normalize('NFD').length === 3) {
                        replier.reply(sender + '은 이미 존재하는 닉네임입니다');
                    } else if (sender[index].normalize('NFD').length !== 3) {
                        replier.reply(sender + '는 이미 존재하는 닉네임입니다');
                    }
                    replier.reply(
                        'ㆍ처음이시라면?\n다른 닉네임으로 다시 시도해주세요\n\nㆍ처음이 아니시라면?\n하순모주님에게 갠톡으로 문의해주세요'
                    );
                    return;
                } else if (!yatzys[sender]) {
                    yatzys[sender] = {
                        id: java.lang.String(imageDB.getProfileImage()).hashCode(),
                        wins: 0,
                        loses: 0,
                        plays: 0,
                    };
                    if (yatzy[room].player1.name === '') {
                        yatzy[room].player1.name = sender;
                        replier.reply(
                            sender + '님 참가 완료!\n참여인원: ' + yatzy[room].player1.name
                        );
                        return;
                    } else if (yatzy[room].player1.name !== '') {
                        yatzy[room].player2.name = sender;
                        replier.reply(
                            sender +
                                '님 참가 완료!\n참여인원: ' +
                                yatzy[room].player1.name +
                                ', ' +
                                yatzy[room].player2.name
                        );
                        yatzy[room].check = true;
                        replier.reply(
                            yatzy[room].player1.name +
                                "님이 '야추게임시작'을 입력할 시 게임이 시작됩니다"
                        );
                        return;
                    }
                }
            }
        } //참가(yatzy[room].check=false)
        if (yatzy[room].check === true) {
            if (sender === yatzy[room].player1.name && msg === '야추게임시작') {
                yatzy[room].check = false;
                replier.reply('곧 야추게임이 시작됩니다!');
                replier.reply('순서 정하는 중...');
                yatzy[room].player1.bonus =
                    (isNaN(yatzy[room].player1.one) ? 0 : yatzy[room].player1.one) +
                    (isNaN(yatzy[room].player1.two) ? 0 : yatzy[room].player1.two) +
                    (isNaN(yatzy[room].player1.three) ? 0 : yatzy[room].player1.three) +
                    (isNaN(yatzy[room].player1.four) ? 0 : yatzy[room].player1.four) +
                    (isNaN(yatzy[room].player1.five) ? 0 : yatzy[room].player1.five) +
                    (isNaN(yatzy[room].player1.six) ? 0 : yatzy[room].player1.six);
                yatzy[room].player2.bonus =
                    (isNaN(yatzy[room].player2.one) ? 0 : yatzy[room].player2.one) +
                    (isNaN(yatzy[room].player2.two) ? 0 : yatzy[room].player2.two) +
                    (isNaN(yatzy[room].player2.three) ? 0 : yatzy[room].player2.three) +
                    (isNaN(yatzy[room].player2.four) ? 0 : yatzy[room].player2.four) +
                    (isNaN(yatzy[room].player2.five) ? 0 : yatzy[room].player2.five) +
                    (isNaN(yatzy[room].player2.six) ? 0 : yatzy[room].player2.six);
                java.lang.Thread.sleep(3000);
                let first = Math.floor(Math.random() * 2);
                if (first === 0) {
                    yatzy[room].player1.turn = true;
                    replier.reply(
                        yatzy[room].player1.name +
                            "님이 걸리셨습니다\n'r'또는 'R'을 입력해 주사위를 굴려주세요"
                    );
                } else if (first === 1) {
                    yatzy[room].player2.turn = true;
                    replier.reply(
                        yatzy[room].player2.name +
                            "님이 걸리셨습니다\n'r'또는 'R'을 입력해 주사위를 굴려주세요"
                    );
                }
            }
        } //시작(yatzy[room].check=true)

        if (sender == yatzy[room].player1.name) {
            if (yatzy[room].player1.turn === true) {
                if (msg === 'r' || msg === 'R') {
                    if (yatzy[room].player1.rolls >= 1 && yatzy[room].turns <= 23) {
                        replier.reply('도로록..');
                        java.lang.Thread.sleep(1500);
                        yatzy[room].player1.rolls--;
                        yatzy[room].turns++;
                        yatzy[room].player1.turn = false;
                        yatzy[room].player1.pin1 = true;
                        roll(yatzy[room].r);
                        replier.reply(
                            yatzy[room].player1.name +
                                '[' +
                                three(yatzy[room].player1.point) +
                                ']   |   [' +
                                three(yatzy[room].player2.point) +
                                ']' +
                                yatzy[room].player2.name +
                                '\n┌────────────┐\n  ⚀    ' +
                                (yatzy[room].player1.one == '__'
                                    ? '( ' + two(국밥(yatzy[room].r, 1)) + ' )'
                                    : '  ' + two(yatzy[room].player1.one) + '  ') +
                                '   |   ' +
                                two(yatzy[room].player2.one) +
                                '    Aces\n  ⚁    ' +
                                (yatzy[room].player1.two == '__'
                                    ? '( ' + two(국밥(yatzy[room].r, 2)) + ' )'
                                    : '  ' + two(yatzy[room].player1.two) + '  ') +
                                '   |   ' +
                                two(yatzy[room].player2.two) +
                                '    Twos\n  ⚂    ' +
                                (yatzy[room].player1.three == '__'
                                    ? '( ' + two(국밥(yatzy[room].r, 3)) + ' )'
                                    : '  ' + two(yatzy[room].player1.three) + '  ') +
                                '   |   ' +
                                two(yatzy[room].player2.three) +
                                '    Threes\n  ⚃    ' +
                                (yatzy[room].player1.four == '__'
                                    ? '( ' + two(국밥(yatzy[room].r, 4)) + ' )'
                                    : '  ' + two(yatzy[room].player1.four) + '  ') +
                                '   |   ' +
                                two(yatzy[room].player2.four) +
                                '    Fours\n  ⚄    ' +
                                (yatzy[room].player1.five == '__'
                                    ? '( ' + two(국밥(yatzy[room].r, 5)) + ' )'
                                    : '  ' + two(yatzy[room].player1.five) + '  ') +
                                '   |   ' +
                                two(yatzy[room].player2.five) +
                                '    Fives\n  ⚅    ' +
                                (yatzy[room].player1.six == '__'
                                    ? '( ' + two(국밥(yatzy[room].r, 6)) + ' )'
                                    : '  ' + two(yatzy[room].player1.six) + '  ') +
                                '   |   ' +
                                two(yatzy[room].player2.six) +
                                '    Sixs\n└─[' +
                                two(yatzy[room].player1.bonus) +
                                '/63] 보너스 [' +
                                two(yatzy[room].player2.bonus) +
                                '/63]─┘\n ⊕    ' +
                                (yatzy[room].player1.ch == '__'
                                    ? '( ' + two(sum(yatzy[room].r)) + ' )'
                                    : '  ' + two(yatzy[room].player1.ch) + '  ') +
                                '   |   ' +
                                two(yatzy[room].player2.ch) +
                                '    Chance\n ⓸    ' +
                                (yatzy[room].player1['4card'] == '__'
                                    ? 도박(yatzy[room].r).includes(4)
                                        ? '( ' + two(sum(yatzy[room].r)) + ' )'
                                        : '( 00 )'
                                    : '  ' + two(yatzy[room].player1['4card']) + '  ') +
                                '   |   ' +
                                yatzy[room].player2['4card'] +
                                '    4 of kind\n ℋ    ' +
                                (yatzy[room].player1.fh == '__'
                                    ? 도박(yatzy[room].r) == '2,3' || 도박(yatzy[room].r) == '3,2'
                                        ? '( ' + two(sum(yatzy[room].r)) + ' )'
                                        : '( 00 )'
                                    : '  ' + two(yatzy[room].player1.fh) + '  ') +
                                '   |   ' +
                                two(yatzy[room].player2.fh) +
                                '    Full House\n Ⓢ    ' +
                                (yatzy[room].player1.ss == '__'
                                    ? small(yatzy[room].r)
                                        ? '( 15 )'
                                        : '( 00 )'
                                    : '  ' + two(yatzy[room].player1.ss) + '  ') +
                                '   |   ' +
                                two(yatzy[room].player2.ss) +
                                '    S. Straight\n Ⓛ    ' +
                                (yatzy[room].player1.ls == '__'
                                    ? large(yatzy[room].r)
                                        ? '( 30 )'
                                        : '( 00 )'
                                    : '  ' + two(yatzy[room].player1.ls) + '  ') +
                                '   |   ' +
                                two(yatzy[room].player2.ls) +
                                '    L. Straight\n 🎲   ' +
                                (yatzy[room].player1.yatz == '__'
                                    ? 도박(yatzy[room].r) == '5'
                                        ? '( 50 )'
                                        : '( 00 )'
                                    : '  ' + two(yatzy[room].player1.yatz) + '  ') +
                                '   |   ' +
                                two(yatzy[room].player2.yatz) +
                                '    Yacht'
                        );
                        replier.reply(
                            '──────────────\n   ' + 주사위(yatzy[room].r) + '\n──────────────'
                        );
                    }
                }
            } //굴리기
            const choice1 = {
                '1': { n: 'Aces', p: 국밥(yatzy[room].r, 1), w: yatzy[room].player1.one },
                '2': { n: 'Twos', p: 국밥(yatzy[room].r, 2), w: yatzy[room].player1.two },
                '3': { n: 'Threes', p: 국밥(yatzy[room].r, 3), w: yatzy[room].player1.three },
                '4': { n: 'Fours', p: 국밥(yatzy[room].r, 4), w: yatzy[room].player1.four },
                '5': { n: 'Fives', p: 국밥(yatzy[room].r, 5), w: yatzy[room].player1.five },
                '6': { n: 'Sixs', p: 국밥(yatzy[room].r, 6), w: yatzy[room].player1.six },
                ch: { n: 'Chance', p: sum(yatzy[room].r), w: yatzy[room].player1.ch },
                '4k': { n: '4 of a kind', p: sum(yatzy[room].r), w: yatzy[room].player2['4card'] },
                fh: { n: 'Full House', p: sum(yatzy[room].r), w: yatzy[room].player1.fh },
                ss: { n: 'S. Straight', p: '15', w: yatzy[room].player1.ssz },
                ls: { n: 'L. Straight', p: '30', w: yatzy[room].player1.ls },
                야추: { n: 'YACHT', p: '50', w: yatzy[room].player1.one },
            };
            if (yatzy[room].player1.pin1 === true) {
                if (Object.keys(choice1).includes(msg)) {
                    yatzy[room].player1.pin2 = true;
                    replier.reply(
                        '얻는 점수: ' +
                            choice1[msg].p +
                            '\n' +
                            choice1[msg].n +
                            '로 결정하시겠습니까? [Y/N]'
                    );
                } //선택
            }
            if (yatzy[room].player1.pin2 === true) {
                if (msg === 'y' || msg === 'Y') {
                    yatzy[room].player1.pin1 = false;
                    yatzy[room].player1.pin2 = false;
                    yatzy[room].player1.pin3 = false;
                    yatzy[room].player2.turn = true;
                    yatzy[room].r = [];
                    choice1[msg].w = choice1[msg].p;
                    yatzy[room].player1.point = yatzy[room].player1.point + choice1[msg].p;
                    replier.reply('결정 완료!');
                } else if (msg === 'n' || msg === 'N') {
                    yatzy[room].player1.pin2 = false;
                }
            } //선택완료
        } //player1
    } //방
    if (msg === '세이브') {
        FileStream.write('/sdcard/모주봇/야추정보.json', JSON.stringify(yatzys));
        FileStream.write('/sdcard/모주봇/야추게임.json', JSON.stringify(yatzy));
        replier.reply('세이브 완료');
        return;
    } //세이브
    if (msg === '테스트') {
        z = roll(dice);
        replier.reply(z + '\n' + (small(z) ? '와!! 스몰스트라이크!' : '..'));
        dice = [];
    }
    if (msg === '다시') {
        if (
            java.lang.String(imageDB.getProfileImage()).hashCode() == '791026921' ||
            java.lang.String(imageDB.getProfileImage()).hashCode() == '-1135056852'
        ) {
            Api.reload('ㄱ야추');
            replier.reply('리로드 완료');
        }
    }
} //리스폰스
function 국밥(arr, num) {
    a = arr.filter((e) => e === num).length;
    return a * num;
}
function 주사위(arr) {
    return arr.map((i) => String.fromCharCode(9855 + i)).join('      ');
}
function 도박(arr) {
    return Array.from(new Set(arr)).map((e) => arr.filter((i) => i === e).length);
}
function roll(arr) {
    for (let i = 0; i < 5; i++) {
        let a = Math.floor(Math.random() * 6);
        arr.push(a + 1);
    }
    return arr;
}
function sum(arr) {
    return arr.map((e) => Number(e)).reduce((a, b) => (a += b), 0);
}
function two(n) {
    if (isNaN(n) == false) {
        if (n < 10) {
            return '0' + n;
        }
        if (n < 100) {
            return n;
        }
    }
    if (isNaN(n) == true) return n;
}
function three(n) {
    if (n < 10) {
        return '00' + n;
    }
    if (n < 100) {
        return '0' + n;
    }
    return n;
}
function large(arr) {
    c = JSON.stringify(Array.from(new Set(arr)).sort((a, b) => a - b));
    if (c.includes('1,2,3,4,5') || c.includes('2,3,4,5,6')) {
        return true;
    } else {
        return false;
    }
}
function small(arr) {
    c = JSON.stringify(Array.from(new Set(arr)).sort((a, b) => a - b));
    if (c.includes('1,2,3,4') || c.includes('2,3,4,5') || c.includes('3,4,5,6')) {
        return true;
    } else {
        return false;
    }
}