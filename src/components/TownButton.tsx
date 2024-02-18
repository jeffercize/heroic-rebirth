import React from 'react';
import { StatsProvider, useMyStatsContext } from '../data/StatsContext';
import { useMyResourcesContext, MyResourcesContextType } from '../data/ResourcesContext';
import { BuildingCostContextType, useBuildingCostContext } from '../data/BuildingCostContext';
import { useVisibilityContext, useVisibilitySettersContext, DivVisibility } from '../data/VisibilityContext';
import './TownButton.css';

type ResourceKey = keyof MyResourcesContextType;
type BuildingCostKey = keyof BuildingCostContextType;

interface Cost{
    name: ResourceKey;
    cost: BuildingCostKey;
    imgSrc: string;
}

interface TownButtonProps {
    buttonText: string;
    descriptionText: string;
    tipText: string;
    incrementValue: number;
    perSecond: boolean;
    maxIncrease: boolean;
    imgSrc: string;
    visibilityKey: string;
    visibilityDescriptionKey: string;
    onClickEffect: (param: any) => void;
    costs: Cost[];
}


const TownButton: React.FC<TownButtonProps> = ({buttonText, descriptionText, tipText, incrementValue, perSecond, maxIncrease, imgSrc, visibilityKey, visibilityDescriptionKey, onClickEffect, costs}) => {
    const resources = useMyResourcesContext();
    const buildingCost = useBuildingCostContext();
    const { charisma, setCharisma } = useMyStatsContext();
    const { divVisibility } = useVisibilityContext();
    const { setVisibility, toggleVisibility } = useVisibilitySettersContext();

    const isCostGreaterThanResource = costs.some(cost => buildingCost[cost.cost] > resources[cost.name]);

    return (
    <div className={divVisibility[visibilityKey] ? 'hidden' : 'single-button'}>
        <div className="horizontal-group">
            <button className="common-button" disabled={isCostGreaterThanResource} onClick={() => onClickEffect(() => incrementValue)}>
                {buttonText}
            </button>
            <button className="common-button collapse-button" onClick={() => toggleVisibility(visibilityDescriptionKey)}>V</button>
        </div>
        <div className={divVisibility[visibilityDescriptionKey] ? 'hidden' : ''}>
            <span style={{ verticalAlign: 'middle'}}> {descriptionText} </span> 
            <span style={{ verticalAlign: 'middle', fontStyle: 'italic'}}> {tipText} </span> 
            <span style={{ verticalAlign: 'middle', fontWeight: 'bold' }}> +{incrementValue} </span> <span style={{ verticalAlign: 'middle', fontWeight: 'bold' }} className={maxIncrease ? '' : 'hidden'}>Max </span>
            <img src={imgSrc} alt={imgSrc}  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img><span className={perSecond ? '' : 'hidden'}> /sec</span>
        </div>
        <div className={divVisibility[visibilityDescriptionKey] ? 'hidden' : 'button-cost'}>
            <div className="cost-label">
                Cost: 
            </div>
            <div className="cost-numbers">
                {costs.map((cost, index) => (
                <div className="cost-row" key={index}>
                    <div className="">
                        <img src={cost.imgSrc} alt={cost.name}  style={{ width: '20px', height: 'auto', verticalAlign: 'middle' }}></img> {cost.name}:
                    </div>
                    <div className="">
                        {resources[cost.name]}/{buildingCost[cost.cost]}
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
    );
}

export default TownButton;