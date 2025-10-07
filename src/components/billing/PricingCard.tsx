import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PricingCardProps {
  name: string;
  price: number | string;
  priceLabel: string;
  badgeText: string;
  badgeColor: string;
  features: string[];
  isCurrentPlan: boolean;
  isDark?: boolean;
  isRecommended?: boolean;
  onAction: () => void;
  actionText: string;
  actionVariant?: 'default' | 'outline' | 'secondary';
  isDisabled?: boolean;
}

export function PricingCard({
  name,
  price,
  priceLabel,
  badgeText,
  badgeColor,
  features,
  isCurrentPlan,
  isDark = false,
  isRecommended = false,
  onAction,
  actionText,
  actionVariant = 'default',
  isDisabled = false,
}: PricingCardProps) {
  return (
    <Card
      className={cn(
        'relative transition-all duration-200',
        isDark
          ? 'bg-gray-800 text-white border-gray-700'
          : 'bg-white border-gray-200',
        isRecommended && 'border-2 border-primary shadow-lg scale-105'
      )}
    >
      {isRecommended && (
        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-4 py-1">
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="space-y-4 pb-4">
        <div className="flex items-center justify-between">
          <h3 className={cn('text-xl font-semibold', isDark && 'text-white')}>
            {name}
          </h3>
          <div className="flex items-center gap-2">
            <div className={cn('h-2 w-2 rounded-full', badgeColor)} />
            <span className={cn('text-sm font-medium', isDark ? 'text-gray-300' : 'text-gray-600')}>
              {badgeText}
            </span>
          </div>
        </div>

        <div className="flex items-baseline gap-2">
          {typeof price === 'number' ? (
            <>
              <span className={cn('text-5xl font-bold', isDark && 'text-white')}>
                ${price}
              </span>
              <span className={cn('text-lg', isDark ? 'text-gray-400' : 'text-muted-foreground')}>
                {priceLabel}
              </span>
            </>
          ) : (
            <span className={cn('text-4xl font-bold', isDark && 'text-white')}>
              {price}
            </span>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        <Button
          onClick={onAction}
          disabled={isDisabled}
          variant={actionVariant}
          className={cn(
            'w-full',
            isDark && actionVariant === 'default' && 'bg-white text-gray-900 hover:bg-gray-100',
            isCurrentPlan && 'cursor-not-allowed'
          )}
        >
          {actionText}
        </Button>

        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check
                className={cn(
                  'h-5 w-5 flex-shrink-0 mt-0.5',
                  isDark ? 'text-green-400' : 'text-green-600'
                )}
              />
              <span className={cn('text-sm', isDark ? 'text-gray-300' : 'text-gray-700')}>
                {feature}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
