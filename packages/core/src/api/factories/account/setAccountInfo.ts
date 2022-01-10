/**
 * Copyright (c) 2021 Burst Apps Team
 * Copyright (c) 2022 Signum Network
 */
import {ChainService} from '../../../service/chainService';
import {UnsignedTransaction} from '../../../typings/unsignedTransaction';
import {DefaultDeadline} from '../../../constants';
import {SetAccountInfoArgs} from '../../../typings/args/setAccountInfoArgs';
import {signIfPrivateKey} from '../../../internal/signIfPrivateKey';

/**
 * Use with [[ApiComposer]] and belongs to [[AccountApi]].
 *
 * See details at [[AccountApi.setAccountInfo]]
 * @module core.api.factories
 */
export const setAccountInfo = (service: ChainService) =>
    (args: SetAccountInfoArgs) =>
        signIfPrivateKey(service, args, async (a: SetAccountInfoArgs) => {

            const parameters = {
                name: a.name,
                description: a.description,
                deadline: DefaultDeadline,
                feeNQT: a.feePlanck,
                publicKey: a.senderPublicKey
            };
            return service.send<UnsignedTransaction>('setAccountInfo', parameters);

        });
