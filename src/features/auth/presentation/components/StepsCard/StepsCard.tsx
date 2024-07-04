import React from 'react';
import { Card, Center, Stack, Title } from '@mantine/core';

import classes from "./StepsCard.module.scss";

interface StepsCardProps {
    stepNumber: number;
    stepTitle: string;
    IconComponent: React.ElementType;
    }

export const StepsCard = ({ stepNumber, stepTitle, IconComponent }: StepsCardProps) => {
  return (
    <Card className={classes.stepsCard}>
      <Center>
        <Stack align="center">
          <Title order={4}>{`Step ${stepNumber}: ${stepTitle}`}</Title>
          <IconComponent size={80} />
        </Stack>
      </Center>
    </Card>
  );
};

