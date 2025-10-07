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
    <div className="relative">
      {isRecommended && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
          <Badge className="bg-primary text-primary-foreground px-4 py-1.5 text-sm font-semibold shadow-md">
            Most Popular
          </Badge>
        </div>
      )}
      <Card
        className={cn(
          'relative transition-all duration-200 rounded-lg overflow-hidden',
          isDark
            ? 'bg-gray-800 text-white border-gray-700'
            : 'bg-white border-gray-200',
          isRecommended && 'border-2 border-primary shadow-lg'
        )}
      >
        <Badge className={cn('absolute top-4 right-4 uppercase text-xs font-bold', badgeColor)}>
          {badgeText}
        </Badge>

        <CardHeader className="space-y-4 pb-4 pt-6">
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
              isCurrentPlan && 'bg-gray-100 text-gray-600 hover:bg-gray-100 cursor-not-allowed'
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
