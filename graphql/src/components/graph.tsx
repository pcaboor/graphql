import React, { useMemo, useRef, useState, useEffect } from 'react';
import { AllXP } from "@/app/types/types";

interface LineChartProps {
    xpData?: AllXP[] | null;
}

const XPLineChart: React.FC<LineChartProps> = ({ xpData }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { width } = containerRef.current.getBoundingClientRect();
                const height = Math.min(width * 0.5, 500);
                setDimensions({
                    width: width,
                    height: height
                });
            }
        };

        handleResize();

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const processedXpData = useMemo(() => {
        if (!xpData || xpData.length === 0) return [];

        const sortedData = [...xpData].sort((a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );

        let cumulativeXP = 0;
        return sortedData.map(xp => {
            cumulativeXP += xp.amount;
            return {
                date: new Date(xp.createdAt),
                cumulativeXP,
                isBonus: xp.isBonus,
                projectName: xp.object.name
            };
        });
    }, [xpData]);

    if (!xpData || xpData.length === 0) {
        return (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
                No XP data available
            </div>
        );
    }

    const margin = { top: 20, right: 20, bottom: 50, left: 60 };
    const chartWidth = dimensions.width - margin.left - margin.right;
    const chartHeight = dimensions.height - margin.top - margin.bottom;

    const maxXp = Math.max(...processedXpData.map(d => d.cumulativeXP));
    const minDate = processedXpData[0].date;
    const maxDate = processedXpData[processedXpData.length - 1].date;

    const scaleX = (date: Date) => {
        const range = maxDate.getTime() - minDate.getTime();
        return ((date.getTime() - minDate.getTime()) / range) * chartWidth;
    };

    const scaleY = (value: number) => {
        return chartHeight - (value / maxXp * chartHeight);
    };

    const linePath = processedXpData.map((point, index) =>
        `${index === 0 ? 'M' : 'L'}${scaleX(point.date)},${scaleY(point.cumulativeXP)}`
    ).join(' ');

    const bonusPoints = processedXpData
        .filter(point => point.isBonus)
        .map(point => ({
            x: scaleX(point.date),
            y: scaleY(point.cumulativeXP)
        }));

    return (
        <div ref={containerRef} className="w-full h-full ">
            <svg width={dimensions.width} height={dimensions.height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    {/* X-Axis (Dates) */}
                    <g className="x axis" transform={`translate(0,${chartHeight})`}>
                        {[minDate, maxDate].map((date, index) => (
                            <g
                                key={index}
                                className="tick"
                                transform={`translate(${index * chartWidth},0)`}
                                style={{ opacity: 1 }}
                            >
                                <line y2="6" x2="0" stroke="currentColor" />
                                <text
                                    dy=".71em"
                                    y="9"
                                    x="0"
                                    style={{
                                        textAnchor: index === 0 ? "start" : "end",
                                        fontSize: "10px",
                                        fill: "currentColor"
                                    }}
                                >
                                    {date.toLocaleDateString('en-US', {
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </text>
                            </g>
                        ))}
                    </g>

                    {/* Y-Axis (XP Values) */}
                    <g className="y axis">
                        {[0, 0.25, 0.5, 0.75, 1].map((fraction, i) => {
                            const value = maxXp * fraction;
                            return (
                                <g
                                    key={i}
                                    className="tick"
                                    transform={`translate(0,${scaleY(value)})`}
                                    style={{ opacity: 1 }}
                                >
                                    <line x2="-6" y2="0" stroke="currentColor" />
                                    <text
                                        dy=".32em"
                                        x="-9"
                                        y="0"
                                        style={{
                                            textAnchor: "end",
                                            fontSize: "10px",
                                            fill: "currentColor"
                                        }}
                                    >
                                        {value.toFixed(0)} KB
                                    </text>
                                </g>
                            );
                        })}
                        <text
                            transform="rotate(-90)"
                            x={-chartHeight / 2}
                            y="-40"
                            style={{
                                textAnchor: "middle",
                                fontSize: "12px",
                                fill: "currentColor"
                            }}
                        >
                            Cumulative XP Gain
                        </text>
                    </g>

                    {/* Cumulative XP Line */}
                    <path
                        d={linePath}
                        fill="none"
                        stroke="#caadff"
                        strokeWidth="2"
                        className="transition-all duration-300 ease-in-out"
                    />

                    {/* Bonus XP Points */}
                    {bonusPoints.map((point, index) => (
                        <circle
                            key={index}
                            cx={point.x}
                            cy={point.y}
                            r="5"
                            fill="#10B981"
                            className="transition-all duration-300 ease-in-out"
                        >
                            <title>Bonus XP Point</title>
                        </circle>
                    ))}


                    {processedXpData.map((point, index) => (
                        <circle
                            key={index}
                            cx={scaleX(point.date)}
                            cy={scaleY(point.cumulativeXP)}
                            r="6"
                            fill="transparent"
                            className="cursor-pointer hover:opacity-50"
                        >
                            <title>{`${point.projectName}: ${point.cumulativeXP.toFixed(1)} KB\n${point.date.toLocaleDateString()}`}</title>
                        </circle>
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default XPLineChart;