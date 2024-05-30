import { parse, format } from 'date-fns';
import { parseDate, getLocalTimeZone } from '@internationalized/date';
import { useDateFormatter } from '@react-aria/i18n';
import { CalendarDate } from '@nextui-org/react';

export const useFormattedDate = (
  date: CalendarDate | undefined,
  mode: string
) => {
  let formatter = useDateFormatter({ dateStyle: 'long' });
  let dateForForm;

  if (mode === 'edit' && date) {
    const dateString = date.toString();
    const parsedDate = parse(dateString, 'MMMM d, yyyy', new Date());
    dateForForm = parseDate(format(parsedDate, 'yyyy-MM-dd'));
  } else {
    const today = new Date();
    const todayFormatted = format(today, 'yyyy-MM-dd');
    dateForForm = parseDate(todayFormatted);
  }

  const localTimeZone = getLocalTimeZone();
  const formattedDate = dateForForm
    ? formatter.format(dateForForm.toDate(localTimeZone))
    : '--';

  return { dateForForm, formattedDate };
};
