import {rebuildTransactionPostData} from '../rebuildTransactionPostData';

describe('rebuildTransactionPostData', () => {
    describe('sendMoney', () => {
        const requestType = 'sendMoney';
        it('should rebuild data correctly - simple', () => {
            const transactionBytes = '00204209750f3d0039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20ef2c4339212c389df87d612000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ff64100032baf5bd38b58b3354797698cdf6b7e6';
            const rebuiltData = {
                recipient: '16107620026796983538',
                amountNQT: '1234567',
                feeNQT: '1000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 61
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
        it('should rebuild data correctly - with message (text)', () => {
            const transactionBytes = '0020a7708d0f3d0039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20ef2c4339212c389df4261bc000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000865c0700593d3a8ae31b7d5b04cfe1531b543c7c01160000805468697320697320612074657874206d657373616765';
            const rebuiltData = {
                recipient: '16107620026796983538',
                amountNQT: '12345666',
                feeNQT: '1000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 61,
                message: 'This is a text message',
                messageIsText: 'true'
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
        it('should rebuild data correctly - with message (binary)', () => {
            const transactionBytes = '0020d5738d0f3d0039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20ef2c4339212c389df4261bc000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001000000895c070029d32af9db24429e04cfe1531b543c7c01200000005374617274696e6720626174746c652120596f75203234342076732020303133';
            const rebuiltData = {
                recipient: '16107620026796983538',
                amountNQT: '12345666',
                feeNQT: '1000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 61,
                message: '5374617274696e6720626174746c652120596f75203234342076732020303133',
                messageIsText: 'false'
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
        it('should rebuild data correctly - with encrypted message', () => {
            const transactionBytes = '00206d738d0f3d0039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20ef2c4339212c389df4261bc000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000002000000895c070029d32af9db24429e04cfe1531b543c7c0140000000b3c0d56f4d06bed3d86a6adc2ade127e1755964408fc32eb5103d2103788cddf5967901285e7229e5e8ac2da7b86a0b46230c173e767187becbb2a6ed339f20a7f31d24677e0bd630659fa5480773c3570df606c41d740a950e5ad4a6fd3f6f9';
            const rebuiltData = {
                recipient: '16107620026796983538',
                amountNQT: '12345666',
                feeNQT: '1000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 61,
                encryptedMessageData: 'b3c0d56f4d06bed3d86a6adc2ade127e1755964408fc32eb5103d2103788cddf5967901285e7229e5e8ac2da7b86a0b46230c173e767187becbb2a6ed339f20a',
                encryptedMessageNonce: '7f31d24677e0bd630659fa5480773c3570df606c41d740a950e5ad4a6fd3f6f9',
                messageToEncryptIsText: 'false'
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
        it('should rebuild data correctly - with recipient public key', () => {
            const transactionBytes = '0020f528950f8300e95f2b89a9696de3793c3dae4da98221b9b07318585251d7e76612928045775c4a99fb10be5bd0964261bc000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004000000c1640700ba018134ec1be4ea04cfe1531b543c7c0191b63d63f5d0c9ffc989af1c6eeb394dbaadce7984653ce45229d3b4504ed818';
            const rebuiltData = {
                recipient: '10867286772731844938',
                amountNQT: '12345666',
                feeNQT: '1000000',
                publicKey: 'e95f2b89a9696de3793c3dae4da98221b9b07318585251d7e76612928045775c',
                deadline: 131,
                recipientPublicKey: '91b63d63f5d0c9ffc989af1c6eeb394dbaadce7984653ce45229d3b4504ed818',
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
        it('should rebuild data correctly - with encryptToSelf message', () => {
            const transactionBytes = '0020e4758d0f3d0039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20ef2c4339212c389df4261bc000000000040420f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000080000008b5c0700b7f554c6be42d97004cfe1531b543c7c0150000080850bc7101dfe7332e36037eec4eed09b0441228b89fdb74f6f541909ad8e950144f3de3858e247af130a390d0db3931ff2dda98569fae65fb52e1a9bbf374a07f2db2aa38752d290268382b8fb8f72a1be6c0cf3e1813e745c8fd2aa1d6b440a6f1645054029eb540b40964960361309';
            const rebuiltData = {
                recipient: '16107620026796983538',
                amountNQT: '12345666',
                feeNQT: '1000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 61,
                encryptToSelfMessageData: '850bc7101dfe7332e36037eec4eed09b0441228b89fdb74f6f541909ad8e950144f3de3858e247af130a390d0db3931ff2dda98569fae65fb52e1a9bbf374a07f2db2aa38752d290268382b8fb8f72a1',
                messageToEncryptToSelfIsText: 'true',
                encryptToSelfMessageNonce: 'be6c0cf3e1813e745c8fd2aa1d6b440a6f1645054029eb540b40964960361309'
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
    });
    describe('sendMoneyMulti', () => {
        const requestType = 'sendMoneyMulti';
        it('should rebuild data correctly - 2 recipients', () => {
            const transactionBytes = '0021210f750fa00539101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e00000000000000004e61bc000000000041420f0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000565100060f839522d41709b54797698cdf6b7e60102f2c4339212c389df0061bc000000000060896b7b500188574e00000000000000';
            const rebuiltData = {
                recipients: '16107620026796983538:12345600;6307292723312036192:78',
                feeNQT: '1000001',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 1440
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
        it('should rebuild data correctly - 20 recipients', () => {
            const transactionBytes = '0021094d780f3d0018f6f49edb73a5528ee0b12a0f907db1a3baf98f9a4b9bf9e62710a79cc04e2d0000000000000000bd5ae93b0300000080841e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000007d6810001182287a8e70ea8754797698cdf6b7e6011488b2f9c1ec657d8ec8d8614a000000006cbdf1bc1a1681e5783ea932020000007c4e85f6db0ffba82f172347000000007e78dd7272cd28113485e63b00000000ed60d1d94ccaae5857a6d43b00000000060000000000000006000000000000000700000000000000070000000000000008000000000000000800000000000000090000000000000009000000000000000a000000000000000a000000000000000b000000000000000b000000000000000c000000000000000c000000000000000d000000000000000d000000000000000e000000000000000e000000000000000f000000000000000f000000000000001000000000000000100000000000000011000000000000001100000000000000120000000000000012000000000000001300000000000000130000000000000014000000000000001400000000000000';
            const rebuiltData = {
                recipients: '10267474793015653000:1247926472;16537523610776092012:9439886968;12176343454934453884:1193482031;1236463989150283902:1004963124;6390267352706015469:1003791959;6:6;7:7;8:8;9:9;10:10;11:11;12:12;13:13;14:14;15:15;16:16;17:17;18:18;19:19;20:20',
                feeNQT: '2000000',
                publicKey: '18f6f49edb73a5528ee0b12a0f907db1a3baf98f9a4b9bf9e62710a79cc04e2d',
                deadline: 61
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
    });
    describe('sendMoneyMultiSame', () => {
        const requestType = 'sendMoneyMultiSame';
        it('should rebuild data correctly - 2 recipients', () => {
            const transactionBytes = '0022dc04790f01008c63aaf9d526ac606d85af78a9a71c4ddbfcaacb76805a7f4026cc15b16f1b530000000000000000c01f630d000000004a420f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000040691000231aa75fc0289f1154797698cdf6b7e60102cd610c3c0f84456196f4f9ae9879de80';
            const rebuiltData = {
                recipients: '7009153596038865357;9285993178362147990',
                amountNQT: '112300000',
                feeNQT: '1000010',
                publicKey: '8c63aaf9d526ac606d85af78a9a71c4ddbfcaacb76805a7f4026cc15b16f1b53',
                deadline: 1
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
        it('should rebuild data correctly - 128 recipients', () => {
            const transactionBytes = '00224809790f7b008c63aaf9d526ac606d85af78a9a71c4ddbfcaacb76805a7f4026cc15b16f1b5300000000000000008098ad5500000000808d5b00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044691000368edba733a74bc754797698cdf6b7e60180c8fe6f1f0000000062261f1200000000013dc67100000000f407321b000000005995f50a00000000b964fc8600000000aa12ad8300000000692677fd000000005ef93563000000001a90e0d2000000000df007ae000000007205693000000000f7afcd380000000015dddeb700000000503a100a000000007a5f79680000000046cfe7ea00000000f7e079600000000011c713de00000000f3f5eff3000000003881994700000000fc9cc63900000000ac5f3183000000009bb6118600000000cb00d25200000000e30054da00000000d916b6dd00000000e26f8414000000009c51e7d9000000002c8ad7a4000000001e20d4520000000095688592000000009a3d7ec5000000001f412ed10000000030f182de000000002df33e4c0000000057a51498000000003b685ee2000000003d921dad00000000c509df0b00000000831422b200000000f07cbb430000000074e6f30000000000e098fa7500000000f38127d000000000eedc5624000000003aabc4b400000000c158b05a0000000048aee501000000004d529a5e00000000aec1373e00000000e07fdb56000000000c315f8d00000000ee4c976200000000c7467f4100000000087960d100000000346fac4c00000000e4c11f7100000000af215da2000000004e59d91d000000005ad8010d0000000012ef7be50000000097f2d775000000002f774fd900000000de5b04870000000059a02479000000000b75470900000000d907f8d500000000b878536c0000000027ba28bc000000004c7cc99c00000000a566009300000000306d18e300000000933e3f4800000000aa77587400000000a00d5a0900000000a10bdea900000000fc509e49000000000ada16a100000000b361fac80000000026bf0b910000000015dd7f2300000000158dd816000000009d9a19b100000000a1519ff600000000c2ec9df400000000aa0ac25a00000000fbf6514f00000000b0d44db8000000003b389f1f00000000594e606100000000a2cbf1e3000000003e4ee2340000000056bd6c0700000000c18f3ad500000000b7b046fc00000000a221551200000000ca96ee5c00000000da385671000000006e93e35000000000952fe4b900000000162a75be000000009e2b75cd0000000059f36810000000005cde2a8b000000008c263e1b00000000bb08e4960000000060872f5200000000311e624600000000f7f7773b00000000d60282f000000000fe322fbb00000000a57cb5da000000001f006c140000000002a0b0a900000000e75f0c21000000008d42f70500000000597d2d71000000006aa068150000000049c76703000000007e67028e00000000de70aa6a0000000036c3d53600000000fd4459ed000000002f6ada160000000056017b3200000000555bba7d00000000a03debe200000000';
            const rebuiltData = {
                recipients: '527433416;304031330;1908817153;456263668;183866713;2264687801;2209157802;4252444265;1664481630;3537932314;2919755789;812189042;953004023;3084836117;168835664;1752784762;3941060422;1618600183;3725838097;4092589555;1201242424;969317628;2201051052;2249307803;1389494475;3662938339;3719698137;344223714;3655815580;2765589036;1389633566;2458216597;3313384858;3509469471;3733123376;1279193901;2551489879;3797837883;2904396349;199166405;2988577923;1136360688;15984244;1979357408;3492250099;609672430;3032787770;1521506497;31829576;1587171917;1043841454;1457225696;2371825932;1654082798;1098860231;3512760584;1286369076;1897906660;2724012463;500783438;218224730;3850104594;1977086615;3645863727;2265209822;2032443481;155677963;3589801945;1817409720;3156785703;2630450252;2466277029;3810028848;1212104339;1951954858;156896672;2849901473;1235112188;2702629386;3371852211;2433466150;595582229;383290645;2971245213;4137636257;4103990466;1522666154;1330771707;3092108464;530528315;1633701465;3824274338;887246398;124566870;3577384897;4232491191;307569058;1559140042;1901476058;1357091694;3118739349;3195349526;3447008158;275313497;2334842460;457057932;2531526843;1378846560;1180835377;997718007;4035052246;3140432638;3669327013;342622239;2846924802;554459111;100090509;1898806617;359178346;57132873;2382522238;1789554910;919978806;3982050557;383412783;846922070;2109365077;3807067552',
                amountNQT: '11230001',
                feeNQT: '6000000',
                publicKey: '8c63aaf9d526ac606d85af78a9a71c4ddbfcaacb76805a7f4026cc15b16f1b53',
                deadline: 123
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
    });
    describe('setAlias', () => {
        const requestType = 'setAlias';

        describe('Version 1', () => {
            it('should rebuild data correctly', () => {
                const transactionBytes = '012152a47b0f4b00f784e177ba7e566ff398f8281980d3fd092f755ab531ebded7f9df93b0fa611a00000000000000000000000000000000002d31010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a14907001461702d41ea3cf104cfe1531b543c7c010d4d79546573743235416c6961731500736f6d65206461746120696e666f726d6174696f6e';
                const rebuiltData = {
                    aliasName: 'MyTest25Alias',
                    aliasURI: 'some data information',
                    feeNQT: '20000000',
                    publicKey: 'f784e177ba7e566ff398f8281980d3fd092f755ab531ebded7f9df93b0fa611a',
                    deadline: 75
                };
                const output = rebuildTransactionPostData(transactionBytes);
                expect(output.requestType).toEqual(requestType);
                expect(output.rebuiltData).toEqual(rebuiltData);
            });
        });

        describe('Version 2', () => {
            it('should rebuild data correctly for default domain', () => {
                const transactionBytes = '012100e42810a0056e1a0abea0cbacdc8c77a7de2868360d3e667b276a2f32bb847579d126d63e7800000000000000000000000000000000002d310100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000004c010800f54aa052dcc9ace304cfe1531b543c7c0211383764666164736a396173386661646a680c0048656c6c6f20776f726c64210000000000000000';
                const rebuiltData = {
                    aliasName: '87dfadsj9as8fadjh',
                    aliasURI: 'Hello world!',
                    feeNQT: '20000000',
                    publicKey: '6e1a0abea0cbacdc8c77a7de2868360d3e667b276a2f32bb847579d126d63e78',
                    deadline: 1440,
                };
                const output = rebuildTransactionPostData(transactionBytes);
                expect(output.requestType).toEqual(requestType);
                expect(output.rebuiltData).toEqual(rebuiltData);
            });
            it('should rebuild data correctly for other tld', () => {
                const transactionBytes = '01214dbc2510140004d794aa453a5bbdb8d580f1d9a76b6d7a25cde0ed38c098550ea0f784d9317a00000000000000000000000000000000002d31010000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000f8fd07001c0f3df7ded9719b04cfe1531b543c7c020331323305007465737431da2f073e06f78938';
                const rebuiltData = {
                    aliasName: '123',
                    aliasURI: 'test1',
                    tld: '4074058944115847130',
                    feeNQT: '20000000',
                    publicKey: '04d794aa453a5bbdb8d580f1d9a76b6d7a25cde0ed38c098550ea0f784d9317a',
                    deadline: 20
                };
                const output = rebuildTransactionPostData(transactionBytes);
                expect(output.requestType).toEqual(requestType);
                expect(output.rebuiltData).toEqual(rebuiltData);
            });
        });
    });
    describe('setTLD', () => {
        const requestType = 'setTLD';
        it('should rebuild data correctly', () => {
            const transactionBytes = '01289da31c10140004d794aa453a5bbdb8d580f1d9a76b6d7a25cde0ed38c098550ea0f784d9317a000000000000000000a0724e18090000002d3101000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000055f4070086134aea12e0d25404cfe1531b543c7c010c313233737061636573686970';
            const rebuiltData = {
                tld: '123spaceship',
                amountNQT: '10000000000000',
                feeNQT: '20000000',
                publicKey: '04d794aa453a5bbdb8d580f1d9a76b6d7a25cde0ed38c098550ea0f784d9317a',
                deadline: 20
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
    });
    describe('setAccountInfo', () => {
        const requestType = 'setAccountInfo';
        it('should rebuild data correctly - Plus very long and utf-8 data', () => {
            const transactionBytes = '01255daa7b0f3d00f784e177ba7e566ff398f8281980d3fd092f755ab531ebded7f9df93b0fa611a00000000000000000000000000000000c0c62d000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000a74907001314da8d5ddb423204cfe1531b543c7c01166120e5928ce59bbd20efbc83efbc9e20f09fa8812041520161626320e4b8ade58d8ee4babae6b091e585b1e5928ce59bbd20efbc83efbc9e20f09fa881204c6f72656d20697073756d20646f6c6f722073697420616d65742c20636f6e73656374657475722061646970697363696e6720656c69742e20437261732065742070756c76696e6172206573742e2041656e65616e2076656e656e61746973207175616d2065676574206c756374757320617563746f722e204475697320626c616e6469742074726973746971756520616c697175616d2e204e616d206469676e697373696d206e756c6c612076697461652075726e61206c6f626f727469732c206174206c6163696e6961206d6574757320636f6d6d6f646f2e2053757370656e64697373652074696e636964756e74206e697369206d692c2076656c20616c697175616d206d61676e6120666163696c69736973206d61747469732e204d616563656e6173207365642e';
            const rebuiltData = {
                name: 'a 和国 ＃＞ 🨁 A',
                description: 'abc 中华人民共和国 ＃＞ 🨁 Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et pulvinar est. Aenean venenatis quam eget luctus auctor. Duis blandit tristique aliquam. Nam dignissim nulla vitae urna lobortis, at lacinia metus commodo. Suspendisse tincidunt nisi mi, vel aliquam magna facilisis mattis. Maecenas sed.',
                feeNQT: '3000000',
                publicKey: 'f784e177ba7e566ff398f8281980d3fd092f755ab531ebded7f9df93b0fa611a',
                deadline: 61
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
    });
    describe('sellAlias', () => {
        const requestType = 'sellAlias';
        it('should rebuild data correctly - Att. v1: aliasName, no recipient', () => {
            const transactionBytes = '01265fad7b0f0200f784e177ba7e566ff398f8281980d3fd092f755ab531ebded7f9df93b0fa611a0000000000000000000000000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ab490700e71c543a858800d104cfe1531b543c7c0111383764666164736a396173386661646a6800e1f50500000000';
            const rebuiltData = {
                aliasName: '87dfadsj9as8fadjh',
                priceNQT: '100000000',
                feeNQT: '1000000',
                publicKey: 'f784e177ba7e566ff398f8281980d3fd092f755ab531ebded7f9df93b0fa611a',
                deadline: 2
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
        it('should rebuild data correctly - Att. v1: aliasName, With recipient', () => {
            const transactionBytes = '012627ae7b0f0200f784e177ba7e566ff398f8281980d3fd092f755ab531ebded7f9df93b0fa611aeedad9492ab5777f000000000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ad4907007b7d90d5e079966104cfe1531b543c7c0111383764666164736a396173386661646a6800e1f50500000000';
            const rebuiltData = {
                aliasName: '87dfadsj9as8fadjh',
                recipient: '9185009158277683950',
                priceNQT: '100000000',
                feeNQT: '1000000',
                publicKey: 'f784e177ba7e566ff398f8281980d3fd092f755ab531ebded7f9df93b0fa611a',
                deadline: 2
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
    });
    describe('buyAlias', () => {
        const requestType = 'buyAlias';
        it('should rebuild data correctly - Att. v1: aliasName', () => {
            const transactionBytes = '012746b07b0f9100be133a1d9975df01db57b664b9d5278e7f7273428b94a9a58f47060c780da821d514bbf423104f1e01e1f5050000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000af4907003cd10663e6abe62104cfe1531b543c7c0111383764666164736a396173386661646a68';
            const rebuiltData = {
                aliasName: '87dfadsj9as8fadjh',
                amountNQT: '100000001',
                feeNQT: '1000000',
                publicKey: 'be133a1d9975df01db57b664b9d5278e7f7273428b94a9a58f47060c780da821',
                deadline: 145
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
    });
    describe('issueAsset', () => {
        const requestType = 'issueAsset';
        it('should rebuild data correctly - Att. v1', () => {
            const transactionBytes = '02205c64820f1700be133a1d9975df01db57b664b9d5278e7f7273428b94a9a58f47060c780da8210000000000000000000000000000000000d6117e0300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c050070076f3e387bea91a6504cfe1531b543c7c010874323334353637380000a08601000000000002';
            const rebuiltData = {
                name: 't2345678',
                description: '',
                quantityQNT: '100000',
                decimals: '2',
                mintable: 'false',
                feeNQT: '15000000000',
                publicKey: 'be133a1d9975df01db57b664b9d5278e7f7273428b94a9a58f47060c780da821',
                deadline: 23
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
        it('should rebuild data correctly - Att. v2', () => {
            const transactionBytes = '02200565820f1700be133a1d9975df01db57b664b9d5278e7f7273428b94a9a58f47060c780da8210000000000000000000000000000000000d6117e0300000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000c150070007bec8ae677b275804cfe1531b543c7c020874323334353637380000a0860100000000000201';
            const rebuiltData = {
                name: 't2345678',
                description: '',
                quantityQNT: '100000',
                decimals: '2',
                mintable: 'true',
                feeNQT: '15000000000',
                publicKey: 'be133a1d9975df01db57b664b9d5278e7f7273428b94a9a58f47060c780da821',
                deadline: 23
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
        it('should rebuild data correctly - mintable with 0 quantity- Att. v2', () => {
            const transactionBytes = '022053672410a0056e1a0abea0cbacdc8c77a7de2868360d3e667b276a2f32bb847579d126d63e780000000000000000000000000000000000d6117e03000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008dfc07009b91f30fa55b0cf204cfe1531b543c7c020761736164617364060061736461736400000000000000000401';
            const rebuiltData = {
                name: 'asadasd',
                description: 'asdasd',
                quantityQNT: '0',
                decimals: '4',
                mintable: 'true',
                feeNQT: '15000000000',
                publicKey: '6e1a0abea0cbacdc8c77a7de2868360d3e667b276a2f32bb847579d126d63e78',
                deadline: 1440
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
    });
    describe('transferAsset', () => {
        const requestType = 'transferAsset';
        it('should rebuild data correctly - Att. v1 (no amountNQT)', () => {
            const transactionBytes = '0221fe6c820f080039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e7fd6799632e5828e000000000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000cb500700b6fa332af6e2cc4404cfe1531b543c7c01c72b7fc607c8f19c0100000000000000';
            const rebuiltData = {
                recipient: '10269022105793844863',
                asset: '11309040075024575431',
                quantityQNT: '1',
                feeNQT: '1000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 8
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
        it('should rebuild data correctly - Att. v1 (with amountNQT)', () => {
            const transactionBytes = '0221b46d820f080039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e7fd6799632e5828e943f7e000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000cb500700b6fa332af6e2cc4404cfe1531b543c7c01c72b7fc607c8f19c0100000000000000';
            const rebuiltData = {
                recipient: '10269022105793844863',
                asset: '11309040075024575431',
                quantityQNT: '1',
                amountNQT: '8273812',
                feeNQT: '1000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 8
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
    });
    describe('transferAssetOwnership', () => {
        const requestType = 'transferAssetOwnership';
        it('should rebuild data correctly', () => {
            const transactionBytes = '022a5538f60f140004d794aa453a5bbdb8d580f1d9a76b6d7a25cde0ed38c098550ea0f784d9317a11b76cefe93cafb9000000000000000000d6117e0300000006d7348a6e1975874339de6e7637ee4de11e21bacfee106686758dd89ac9f710000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000096cb070077dfcb12bbf713f804cfe1531b543c7c';
            const rebuiltData = {
                recipient: '13379979993382958865',
                referencedTransactionFullHash: '06d7348a6e1975874339de6e7637ee4de11e21bacfee106686758dd89ac9f710',
                feeNQT: '15000000000',
                publicKey: '04d794aa453a5bbdb8d580f1d9a76b6d7a25cde0ed38c098550ea0f784d9317a',
                deadline: 20
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
    });
    describe('placeAskOrder', () => {
        const requestType = 'placeAskOrder';
        it('should rebuild data correctly', () => {
            const transactionBytes = '02223c72820f170039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e0000000000000000000000000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d0500700e79f2eda1d5e75da04cfe1531b543c7c01353218a0732b4bd40a000000000000001027000000000000';
            const rebuiltData = {
                asset: '15297368334901195317',
                quantityQNT: '10',
                priceNQT: '10000',
                feeNQT: '1000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 23
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
    });
    describe('placeBidOrder', () => {
        const requestType = 'placeBidOrder';
        it('should rebuild data correctly', () => {
            const transactionBytes = '02230973820f180039101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e0000000000000000000000000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d150070022f25e4ec363e92304cfe1531b543c7c01353218a0732b4bd40a000000000000001027000000000000';
            const rebuiltData = {
                asset: '15297368334901195317',
                quantityQNT: '10',
                priceNQT: '10000',
                feeNQT: '1000000',
                publicKey: '39101b80470d65340bb094b80e3178b528d3194a97e20dbaba1ed966a06ac20e',
                deadline: 24
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
    });
    describe('cancelAskOrder', () => {
        const requestType = 'cancelAskOrder';
        it('should rebuild data correctly', () => {
            const transactionBytes = '02243279820fa005f3b1ac892aa896a9cd25d7e6401f857c57f62c253207d043e90a19ef4fb056620000000000000000000000000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d850070094af54ecbe05fc9204cfe1531b543c7c012ee4682198295f6c';
            const rebuiltData = {
                order: '7809006012256019502',
                feeNQT: '1000000',
                publicKey: 'f3b1ac892aa896a9cd25d7e6401f857c57f62c253207d043e90a19ef4fb05662',
                deadline: 1440
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
    });
    describe('cancelBidOrder', () => {
        const requestType = 'cancelBidOrder';
        it('should rebuild data correctly', () => {
            const transactionBytes = '0225397a820f1800f3b1ac892aa896a9cd25d7e6401f857c57f62c253207d043e90a19ef4fb056620000000000000000000000000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000d95007006ecc1de4751d657f04cfe1531b543c7c01456c3755f57b575e';
            const rebuiltData = {
                order: '6798038456165952581',
                feeNQT: '1000000',
                publicKey: 'f3b1ac892aa896a9cd25d7e6401f857c57f62c253207d043e90a19ef4fb05662',
                deadline: 24
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
    });
    describe('mintAsset', () => {
        const requestType = 'mintAsset';
        it('should rebuild data correctly', () => {
            const transactionBytes = '02263c7c820f1800f3b1ac892aa896a9cd25d7e6401f857c57f62c253207d043e90a19ef4fb056620000000000000000000000000000000040420f000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000da5007006becfabbd469876204cfe1531b543c7c013f58ea3554c02d0f0100000000000000';
            const rebuiltData = {
                asset: '1093741752435234879',
                quantityQNT: '1',
                feeNQT: '1000000',
                publicKey: 'f3b1ac892aa896a9cd25d7e6401f857c57f62c253207d043e90a19ef4fb05662',
                deadline: 24
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
    });
    describe('addAssetTreasuryAccount', () => {
        const requestType = 'addAssetTreasuryAccount';
        it('should rebuild data correctly', () => {
            const transactionBytes = '0227457d820f1800f3b1ac892aa896a9cd25d7e6401f857c57f62c253207d043e90a19ef4fb05662d7e7814f9268a5b9000000000000000040420f00000000003f58ea3554c02d0f45bd42f8cfb9e83986bec4ab61adace03e4bdb7cff2dc8500000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000db5007007ea65d22d460df5504cfe1531b543c7c';
            const rebuiltData = {
                recipient: '13377213245782353879',
                feeNQT: '1000000',
                publicKey: 'f3b1ac892aa896a9cd25d7e6401f857c57f62c253207d043e90a19ef4fb05662',
                referencedTransactionFullHash: '3f58ea3554c02d0f45bd42f8cfb9e83986bec4ab61adace03e4bdb7cff2dc850',
                deadline: 24
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
    });
    describe('distributeToAssetHolders', () => {
        const requestType = 'distributeToAssetHolders';
        it('should rebuild data correctly: with amount and asset to distribute', () => {
            const transactionBytes = '0228ed82820f1800f3b1ac892aa896a9cd25d7e6401f857c57f62c253207d043e90a19ef4fb05662000000000000000000e40b540200000040771b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000e15007008303ae26d5a1c99f04cfe1531b543c7c01353218a0732b4bd40a00000000000000cbfa7d7e71c42b486400000000000000';
            const rebuiltData = {
                asset: '15297368334901195317',
                quantityMinimumQNT: '10',
                amountNQT: '10000000000',
                assetToDistribute: '5200466186461903563',
                quantityQNT: '100',
                feeNQT: '1800000',
                publicKey: 'f3b1ac892aa896a9cd25d7e6401f857c57f62c253207d043e90a19ef4fb05662',
                deadline: 24
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
        it('should rebuild data correctly: with amount and NO asset to distribute', () => {
            const transactionBytes = '0228018d820f1800f3b1ac892aa896a9cd25d7e6401f857c57f62c253207d043e90a19ef4fb05662000000000000000000e40b540200000040771b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ec5007009b9ac639082a225f04cfe1531b543c7c01353218a0732b4bd40a0000000000000000000000000000000000000000000000';
            const rebuiltData = {
                asset: '15297368334901195317',
                quantityMinimumQNT: '10',
                amountNQT: '10000000000',
                feeNQT: '1800000',
                publicKey: 'f3b1ac892aa896a9cd25d7e6401f857c57f62c253207d043e90a19ef4fb05662',
                deadline: 24
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
        it('should rebuild data correctly: with asset to distribute and NO amount', () => {
            const transactionBytes = '02282e8d820f1800f3b1ac892aa896a9cd25d7e6401f857c57f62c253207d043e90a19ef4fb056620000000000000000000000000000000040771b000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000ed5007004034ca0224e4cdbc04cfe1531b543c7c01353218a0732b4bd40a00000000000000cbfa7d7e71c42b486400000000000000';
            const rebuiltData = {
                asset: '15297368334901195317',
                quantityMinimumQNT: '10',
                assetToDistribute: '5200466186461903563',
                quantityQNT: '100',
                feeNQT: '1800000',
                publicKey: 'f3b1ac892aa896a9cd25d7e6401f857c57f62c253207d043e90a19ef4fb05662',
                deadline: 24
            };
            const output = rebuildTransactionPostData(transactionBytes);
            expect(output.requestType).toEqual(requestType);
            expect(output.rebuiltData).toEqual(rebuiltData);
        });
    });
});
