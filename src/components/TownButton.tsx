import React, {useEffect, useState} from 'react';
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
    incrementValue: number[]; // Changed to array
    perSecond: boolean;
    maxIncrease: boolean;
    incrementText: string;
    imgSrc: string[]; // Changed to array
    visibilityKey: string;
    visibilityDescriptionKey: string;
    onClickEffect: (param: any) => void;
    costs: Cost[];
}

function formatNumber(num: number): string {
    if (num >= 1000000) {
      return (num / 1000000).toPrecision(3) + 'M';
    } else if (num >= 10000) {
      return (num / 1000).toPrecision(3) + 'K';
    } else if (num >= 10) {
      return num.toPrecision(4);
    } else if (num >= 1) {
      return num.toPrecision(3);
    } else {
      return num.toPrecision(2);
    }
  }


const TownButton: React.FC<TownButtonProps> = ({buttonText, descriptionText, tipText, incrementValue, perSecond, maxIncrease, incrementText, imgSrc, visibilityKey, visibilityDescriptionKey, onClickEffect, costs}) => {
    const resources = useMyResourcesContext();
    const buildingCost = useBuildingCostContext();
    const stats = useMyStatsContext();
    const { divVisibility } = useVisibilityContext();
    const { setVisibility, toggleVisibility } = useVisibilitySettersContext();

    const [autoClicking, setAutoClicking] = useState(false);
    const [buttonKey, setButtonKey] = useState(0);
    const [mouseDown, setMouseDown] = useState(false);

    useEffect(() => {
        let intervalId: NodeJS.Timeout | null = null;
    
        if (mouseDown) {
            intervalId = setInterval(() => {
                onClickEffect(incrementValue);
                setButtonKey(prevKey => prevKey + 1);
            }, 500);
        } else if (intervalId !== null) {
            clearInterval(intervalId);
        }
    
        return () => {
            if (intervalId !== null) {
                clearInterval(intervalId);
            }
        };
    }, [mouseDown, onClickEffect, incrementValue]);
    
    const handleMouseDown = () => {
        setMouseDown(true);
        setAutoClicking(true);
    };
    
    const handleMouseUp = () => {
        setMouseDown(false);
        setAutoClicking(false);
    };

    const isSomeCostGreaterThanResource = costs.some(cost => buildingCost[cost.cost] > resources[cost.name]);
    const isCostGreaterThanResource = costs.map(cost => buildingCost[cost.cost] > resources[cost.name]);
    const isCostGreaterThanMaxResource = costs.map(cost => {
        const maxResourceKey = `max${cost.name.charAt(0).toUpperCase() + cost.name.slice(1)}` as keyof typeof resources;
        return buildingCost[cost.cost] > resources[maxResourceKey];
    });

    const isSomeCostGreaterThanMaxResource = costs.some(cost => {
        const maxResourceKey = `max${cost.name.charAt(0).toUpperCase() + cost.name.slice(1)}` as keyof typeof resources;
        return buildingCost[cost.cost] > resources[maxResourceKey];
    });

    return (
    <div className={divVisibility[visibilityKey] ? 'hidden' : 'single-button'}>
        <div className="horizontal-group">
            <button key={buttonKey} className={`${isSomeCostGreaterThanMaxResource ? 'common-button red-text' : 'common-button'} ${autoClicking ? 'auto-clicking' : ''}`} disabled={isSomeCostGreaterThanResource} onClick={() => onClickEffect(() => incrementValue)} onMouseDown={handleMouseDown} onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
                {buttonText}
            </button>
            <button className="common-button collapse-button" onClick={() => toggleVisibility(visibilityDescriptionKey)}>V</button>
        </div>
        <div className={divVisibility[visibilityDescriptionKey] ? 'hidden' : ''}>
            <span style={{ verticalAlign: 'middle'}}> {descriptionText} </span> 
            <span style={{ verticalAlign: 'middle', fontStyle: 'italic'}}> {tipText} </span> 
            {incrementValue.map((value, index) => (
                <React.Fragment key={index}>
                    <span style={{ verticalAlign: 'middle', fontWeight: 'bold' }}> +{formatNumber(value)} </span> <span style={{ verticalAlign: 'middle', fontWeight: 'bold' }} className={maxIncrease ? '' : 'hidden'}>Max </span>
                    <span style={{ verticalAlign: 'middle', fontWeight: 'bold' }}>{incrementText}</span>
                    <img src={imgSrc[index]} alt={"img"}  style={{ width: '22px', height: 'auto', verticalAlign: 'middle' }}></img>
                </React.Fragment>
            ))}
        </div>
        <div className={divVisibility[visibilityDescriptionKey] ? 'hidden' : 'button-cost'}>
            {costs.length > 0 && (
            <div className="cost-label">
                Cost: 
            </div>
            )}
            <div className="cost-numbers">
                {costs.map((cost, index) => (
                <div className={'cost-row'} key={index}>
                    <div style={{paddingRight: '5px'}} className={''}>
                        <img src={cost.imgSrc} alt={cost.name}  style={{ width: '20px', height: 'auto', verticalAlign: 'middle' }}></img> {cost.name}:
                    </div>
                    <div className={''}>
                        <span className={isCostGreaterThanResource[index] ? 'red-text' : ''}>{Math.floor(resources[cost.name])}</span>/<span className={isCostGreaterThanMaxResource[index] ? 'red-text' : ''}>{Math.floor(buildingCost[cost.cost])}</span>
                    </div>
                </div>
                ))}
            </div>
        </div>
    </div>
    );
}

export default TownButton;