import DumbbellIcon  from '../../icons/dumbbell.svg?react';

import BarbelllIcon  from '../../icons/barbell.svg?react';
import KettelbellIcon from '../../icons/kettlebell.svg?react';
import FlatBenchIcon from '../../icons/flatBench.svg?react';
import InclineBenchIcon from '../../icons/inclineBench.svg?react';
import DeclineBenchIcon from '../../icons/declineBench.svg?react';
import ResistanceBandsIcon from '../../icons/resistanceBands.svg?react';
import PullUpBarIcon from '../../icons/pullUpBar.svg?react';
import ParallelBarsIcon from '../../icons/parallelBars.svg?react';
import RowingMachineIcon from '../../icons/rowingMachine.svg?react';
import AbWheelIcon from '../../icons/abWheel.svg?react';
import SquatRackIcon from '../../icons/squatRack.svg?react';
import BodyWeigth from '../../icons/bodyWeigth.svg?react';

import { EQUIPMENT } from './equipmentConstants';
const defaultList = ['bodyWeigth'];
const equipmentList = [
  { id: 'dumbbells', name: EQUIPMENT.DUMBBELLS, icon: <DumbbellIcon/> },
  { id: 'barbells', name: EQUIPMENT.BARBELLS, icon: <BarbelllIcon /> },
  { id: 'kettlebells', name: EQUIPMENT.KETTLEBELLS, icon: <KettelbellIcon /> },
  { id: 'resistanceBands', name: EQUIPMENT.RESISTANCE_BANDS, icon: <ResistanceBandsIcon /> },
  { id: 'flatBench', name: EQUIPMENT.FLAT_BENCH, icon: <FlatBenchIcon /> },
  { id: 'inclineBench', name: EQUIPMENT.INCLINE_BENCH, icon: <InclineBenchIcon /> },
  { id: 'declineBench', name: EQUIPMENT.DECLINE_BENCH, icon: <DeclineBenchIcon /> },
  { id: 'pullUpBar', name: EQUIPMENT.PULL_UP_BAR, icon: <PullUpBarIcon /> },
  { id: 'parallelBars', name: EQUIPMENT.PARALLEL_BARS, icon: <ParallelBarsIcon /> },
  { id: 'rowingMachine', name: EQUIPMENT.ROWING_MACHINE, icon: <RowingMachineIcon /> },
  { id: 'abWheel', name: EQUIPMENT.AB_WHEEL, icon: <AbWheelIcon /> },
  { id: 'squatRack', name: EQUIPMENT.SQUAT_RACK, icon: <SquatRackIcon /> },
  { id: 'bodyWeigth', name: EQUIPMENT.BODY_WEIGTH, icon: <BodyWeigth /> }
];

export { equipmentList, defaultList };
