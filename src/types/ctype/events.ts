import {sts, Block, Bytes, Option, Result, EventType, RuntimeCtx} from '../support'
import * as v2800 from '../v2800'
import * as v10890 from '../v10890'

export const cTypeCreated =  {
    name: 'Ctype.CTypeCreated',
    /**
     * A new CType has been created.
     * \[creator identifier, CType hash\]
     */
    v2800: new EventType(
        'Ctype.CTypeCreated',
        sts.tuple([v2800.AccountId32, v2800.H256])
    ),
}

export const cTypeUpdated =  {
    name: 'Ctype.CTypeUpdated',
    /**
     * Information about a CType has been updated.
     * \[CType hash\]
     */
    v10890: new EventType(
        'Ctype.CTypeUpdated',
        v10890.H256
    ),
}
