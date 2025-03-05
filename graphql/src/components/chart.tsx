import React, { useMemo, useRef, useState, useEffect } from 'react';
import { AllXP } from "@/app/types/types";

interface VerticalBarChartProps {
    xpData?: AllXP[] | null;
}

const VerticalBarChart: React.FC<VerticalBarChartProps> = ({ xpData }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dimensions, setDimensions] = useState({ width: 500, height: 500 });

    useEffect(() => {
        const handleResize = () => {
            if (containerRef.current) {
                const { width } = containerRef.current.getBoundingClientRect();
                // Maintain aspect ratio
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

    const monthlyXpData = useMemo(() => {
        if (!xpData || xpData.length === 0) return [];

        const monthMap = new Map<string, {
            totalAmount: number,
            bonusAmount: number,
            monthName: string
        }>();

        xpData.forEach(xp => {
            const date = new Date(xp.createdAt);
            const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
            const monthName = date.toLocaleString('default', { month: 'short', year: 'numeric' });

            if (!monthMap.has(monthKey)) {
                monthMap.set(monthKey, {
                    totalAmount: 0,
                    bonusAmount: 0,
                    monthName
                });
            }

            const monthData = monthMap.get(monthKey)!;
            monthData.totalAmount += xp.amount;
            if (xp.isBonus) {
                monthData.bonusAmount += xp.amount;
            }
        });

        return Array.from(monthMap.values()).sort((a, b) =>
            new Date(a.monthName).getTime() - new Date(b.monthName).getTime()
        );
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

    const maxXp = Math.max(...monthlyXpData.map(month => month.totalAmount));

    const scaleY = (value: number) => {
        return chartHeight - (value / maxXp * chartHeight);
    };

    const barWidth = chartWidth / (monthlyXpData.length * 1.9);

    return (
        <div ref={containerRef} className="w-full h-full">
            <svg width={dimensions.width} height={dimensions.height}>
                <g transform={`translate(${margin.left},${margin.top})`}>
                    {/* X-Axis (Months) */}
                    <g className="x axis" transform={`translate(0,${chartHeight})`}>
                        {monthlyXpData.map((month, index) => (
                            <g
                                key={index}
                                className="tick"
                                transform={`translate(${index * (barWidth * 1.5)},0)`}
                                style={{ opacity: 1 }}
                            >
                                <line y2="6" x2="0" stroke="currentColor" />
                                <text
                                    dy=".71em"
                                    y="9"
                                    x="0"
                                    style={{
                                        textAnchor: "middle",
                                        fontSize: "10px",
                                        fill: "currentColor"
                                    }}
                                >
                                    {month.monthName}
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
                            Monthly XP Gain
                        </text>
                    </g>

                    {/* Bars */}
                    {monthlyXpData.map((month, index) => (
                        <g key={index}>
                            {/* Regular XP Bar */}
                            <rect
                                className="bar fill-blue-500 transition-all duration-300 ease-in-out"
                                x={index * (barWidth * 1.5)}
                                width={barWidth}
                                y={scaleY(month.totalAmount)}
                                height={chartHeight - scaleY(month.totalAmount)}
                                rx="4"
                            >
                                <title>{`${month.monthName}: ${month.totalAmount.toFixed(1)} KB`}</title>
                            </rect>

                            {/* Bonus XP Bar */}
                            {month.bonusAmount > 0 && (
                                <rect
                                    className="bar fill-green-500 transition-all duration-300 ease-in-out"
                                    x={index * (barWidth * 1.5)}
                                    width={barWidth}
                                    y={scaleY(month.bonusAmount)}
                                    height={chartHeight - scaleY(month.bonusAmount)}
                                    rx="4"
                                >
                                    <title>{`${month.monthName} Bonus: ${month.bonusAmount.toFixed(1)} KB`}</title>
                                </rect>
                            )}
                        </g>
                    ))}
                </g>
            </svg>
        </div>
    );
};

export default VerticalBarChart;