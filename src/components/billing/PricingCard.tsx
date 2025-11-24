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
  badgeDotColor?: string;
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
  badgeDotColor,
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
    <div className="relative pt-6">
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-primary text-primary-foreground px-4 py-1.5 text-sm font-semibold shadow-md whitespace-nowrap">
            Most Popular
          </Badge>
        </div>
      )}
      <Card
        className={cn(
          'relative transition-all duration-200 rounded-2xl overflow-hidden shadow-sm border',
          isDark
            ? 'bg-gray-800 text-white border-gray-700'
            : 'bg-white border-gray-200',
          isRecommended && 'border-2 border-primary shadow-xl'
        )}
      >
        <div className="absolute top-4 right-4 flex items-center gap-1.5">
          {badgeDotColor && <div className={cn('w-2.5 h-2.5 rounded-full', badgeDotColor)} />}
          <Badge className={cn('uppercase text-xs font-semibold px-3 py-1 rounded-full', badgeColor)}>
            {badgeText}
          </Badge>
        </div>

        <CardHeader className="space-y-4 pb-4 pt-6 pr-24">
          <h3 className={cn('text-2xl font-bold', isDark && 'text-white')}>
            {name}
          </h3>

          <div className="flex items-baseline gap-2">
            {typeof price === 'number' ? (
              <>
                <span className={cn('text-5xl font-bold', isDark && 'text-white')}>
                  ${price}
                </span>
                <span className={cn('text-base', isDark ? 'text-gray-400' : 'text-muted-foreground')}>
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
              isDisabled && 'cursor-not-allowed opacity-50'
            )}
          >
            {actionText}
          </Button>

          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2.5">
                <Check
                  className={cn(
                    'h-5 w-5 flex-shrink-0 mt-0.5',
                    isDark ? 'text-green-400' : 'text-green-600'
                  )}
                />
                <span className={cn('text-sm leading-relaxed', isDark ? 'text-gray-300' : 'text-gray-700')}>
                  {feature}
                </span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
