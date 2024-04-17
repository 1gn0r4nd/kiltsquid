import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v2800 from '../v2800'

export const didCreated =  {
    name: 'Did.DidCreated',
    /**
     * A new DID has been created.
     * \[transaction signer, DID identifier\]
     */
    v2800: new EventType(
        'Did.DidCreated',
        sts.tuple([v2800.AccountId32, v2800.AccountId32])
    ),
}

export const didUpdated =  {
    name: 'Did.DidUpdated',
    /**
     * A DID has been updated.
     * \[DID identifier\]
     */
    v2800: new EventType(
        'Did.DidUpdated',
        v2800.AccountId32
    ),
}

export const didDeleted =  {
    name: 'Did.DidDeleted',
    /**
     * A DID has been deleted.
     * \[DID identifier\]
     */
    v2800: new EventType(
        'Did.DidDeleted',
        v2800.AccountId32
    ),
}
