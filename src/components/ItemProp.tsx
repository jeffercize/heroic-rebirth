import React from 'react';

export interface ItemProp {
    id: number;
    quantity: number;
}

const ItemProp: React.FC<ItemProp> = () => {
    return (
        <div >
        </div>
    );
};

export default ItemProp;