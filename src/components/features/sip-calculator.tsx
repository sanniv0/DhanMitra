'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartConfig } from '@/components/ui/chart';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Legend } from 'recharts';
import { formatCurrency } from '@/lib/utils';

type SipData = {
  invested: number;
  returns: number;
  total: number;
  chartData: { year: number; invested: number; returns: number; total: number }[];
};

const chartConfig = {
  invested: { label: 'Invested', color: 'hsl(var(--secondary-foreground))' },
  returns: { label: 'Returns', color: 'hsl(var(--primary))' },
} satisfies ChartConfig;

export function SipCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [returnRate, setReturnRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(10);
  const [sipData, setSipData] = useState<SipData | null>(null);

  const calculateSip = () => {
    const i = returnRate / 100 / 12;
    const n = timePeriod * 12;
    const P = monthlyInvestment;

    const totalValue = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const investedAmount = P * n;
    const estimatedReturns = totalValue - investedAmount;

    const chartData = [];
    for (let year = 1; year <= timePeriod; year++) {
      const yearly_n = year * 12;
      const yearlyTotal = P * ((Math.pow(1 + i, yearly_n) - 1) / i) * (1 + i);
      const yearlyInvested = P * yearly_n;
      chartData.push({
        year: year,
        invested: Math.round(yearlyInvested),
        returns: Math.round(yearlyTotal - yearlyInvested),
        total: Math.round(yearlyTotal)
      });
    }

    setSipData({
      invested: Math.round(investedAmount),
      returns: Math.round(estimatedReturns),
      total: Math.round(totalValue),
      chartData: chartData,
    });
  };


  return (
    <div className="grid lg:grid-cols-5 gap-8">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="font-headline">SIP Return Calculator</CardTitle>
          <CardDescription>Estimate the future value of your monthly investments.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="monthly-investment">Monthly Investment ({formatCurrency(monthlyInvestment)})</Label>
            <Slider id="monthly-investment" value={[monthlyInvestment]} onValueChange={([val]) => setMonthlyInvestment(val)} max={100000} step={1000} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="return-rate">Expected Return Rate ({returnRate}% p.a.)</Label>
            <Slider id="return-rate" value={[returnRate]} onValueChange={([val]) => setReturnRate(val)} max={30} step={1} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="time-period">Time Period ({timePeriod} Years)</Label>
            <Slider id="time-period" value={[timePeriod]} onValueChange={([val]) => setTimePeriod(val)} max={40} step={1} />
          </div>
          <Button onClick={calculateSip} className="w-full">Calculate</Button>
        </CardContent>
      </Card>

      <Card className="lg:col-span-3">
        <CardHeader>
          <CardTitle className="font-headline">Your Projection</CardTitle>
          {sipData && <CardDescription>After {timePeriod} years, your investment could be worth {formatCurrency(sipData.total)}.</CardDescription>}
        </CardHeader>
        <CardContent>
          {sipData ? (
            <div className="space-y-4">
              <div className="grid grid-cols-3 text-center divide-x rounded-lg border">
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">Invested</p>
                  <p className="text-lg font-bold">{formatCurrency(sipData.invested)}</p>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">Returns</p>
                  <p className="text-lg font-bold">{formatCurrency(sipData.returns)}</p>
                </div>
                <div className="p-4">
                  <p className="text-sm text-muted-foreground">Total Value</p>
                  <p className="text-lg font-bold text-primary">{formatCurrency(sipData.total)}</p>
                </div>
              </div>

              <ChartContainer config={chartConfig} className="w-full h-[250px]">
                <BarChart accessibilityLayer data={sipData.chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="year" tickLine={false} tickMargin={10} axisLine={false} tickFormatter={(value) => `Yr ${value}`} />
                  <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `Rs ${Number(value) / 100000}L`} />
                  <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
                  <Legend />
                  <Bar dataKey="invested" fill="var(--color-invested)" stackId="a" radius={[0, 0, 4, 4]} />
                  <Bar dataKey="returns" fill="var(--color-returns)" stackId="a" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ChartContainer>
            </div>
          ) : (
            <div className="flex items-center justify-center h-full min-h-[300px] text-muted-foreground">
              <p>Enter your details and click "Calculate" to see your projection.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
