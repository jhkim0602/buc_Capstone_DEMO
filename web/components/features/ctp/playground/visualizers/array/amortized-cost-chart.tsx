"use client";

import { Bar, BarChart, CartesianGrid, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from "recharts";

interface CostData {
  step: number;
  cost: number; // 1 for normal, N for resize
  isResize: boolean;
  capacity: number;
}

interface AmortizedCostChartProps {
  data: CostData[];
}

export function AmortizedCostChart({ data }: AmortizedCostChartProps) {
  if (!data || data.length === 0) return null;

  return (
    <div className="h-full w-full flex flex-col">
       <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2 text-center">Amortized Time Complexity Analysis</h4>
       <div className="flex-1 min-h-[150px]">
         <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
               <CartesianGrid strokeDasharray="3 3" vertical={false} strokeOpacity={0.5} />
               <XAxis dataKey="step" tick={{fontSize: 10}} interval={0} />
               <YAxis tick={{fontSize: 10}} />
               <Tooltip
                  cursor={{fill: 'transparent'}}
                  content={({ payload, label }) => {
                      if (!payload || !payload.length) return null;
                      const d = payload[0].payload as CostData;
                      return (
                          <div className="bg-popover text-popover-foreground text-xs p-2 rounded border shadow-lg">
                              <p className="font-bold mb-1">Step {label}</p>
                              <p>Cost: <span className="font-mono">{d.cost}</span></p>
                              <p>Capacity: <span className="font-mono">{d.capacity}</span></p>
                              {d.isResize && <p className="text-red-500 font-bold mt-1">Resize Event! (O(N))</p>}
                          </div>
                      );
                  }}
               />
               <Bar dataKey="cost" fill="#8884d8" radius={[4, 4, 0, 0]}>
                  {data.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.isResize ? '#ef4444' : '#3b82f6'} />
                  ))}
               </Bar>
               <ReferenceLine y={1} stroke="green" strokeDasharray="3 3" label={{ position: 'top',  value: 'O(1)', fill: 'green', fontSize: 10 }} />
            </BarChart>
         </ResponsiveContainer>
       </div>
    </div>
  );
}
