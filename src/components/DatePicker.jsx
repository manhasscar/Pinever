import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../styles/components/DataPicker.css';
import { ko } from 'date-fns/locale';
import { useState } from 'react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <DatePicker
      dateFormat="yyyy년 MM월 dd일" // 날짜 형태
      shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
      minDate={new Date('2000-01-01')} // minDate 이전 날짜 선택 불가
      maxDate={new Date()} // maxDate 이후 날짜 선택 불가
      locale={ko}
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      // customInput={<ExampleCustomInput />}
    />
  );
};

export default Calendar;
