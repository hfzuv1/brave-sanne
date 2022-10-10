import classNames from "classnames";
import "./styles.css";

export default function Row({ id, item, onChange }) {
  const addZero = (value) => (value < 10 ? "0" + value : value);
  const strDate = (date) => {
    const hours = addZero(date.getHours());
    const minutes = addZero(date.getMinutes());
    return hours + ":" + minutes;
  };

  const isHippoHour = (date) => {
    const schedule = [
      [1, 7],
      [4, 11],
      [7, 16],
      [10, 8],
      [13, 12],
      [16, 17],
      [19, 13],
      [22, 19],
      [25, 20],
      [28, 21],
      [31, 22]
    ];
    return schedule.some(
      (x) => x[0] === date.getDate() && x[1] === date.getHours()
    );
  };

  const isXpColosseum = (date) => {
    const schedule = [
      [0, 10],
      [0, 16],
      [1, 12],
      [3, 15],
      [5, 19],
      [6, 12],
      [6, 22]
    ];
    return schedule.some(
      (x) => x[0] === date.getDay() && x[1] === date.getHours()
    );
  };

  const isMercilessXp = (date) => {
    const schedule = [
      [0, 21],
      [2, 13],
      [4, 17],
      [6, 10]
    ];
    return schedule.some(
      (x) => x[0] === date.getDay() && x[1] === date.getHours()
    );
  };

  const isXpBonanza = (date) => {
    const schedule = [
      [0, 19],
      [1, 13],
      [3, 19],
      [6, 11]
    ];
    return schedule.some(
      (x) => x[0] === date.getDay() && x[1] === date.getHours()
    );
  };

  const calc = (v, maxV) => {
    const calcNumOfTickets = (v) => parseInt(v / 400, 10);

    let numOfLeaderships = 0;
    let numOfTickets = calcNumOfTickets(v);
    while (true) {
      let numOfTickets2 = calcNumOfTickets(v + (numOfLeaderships + 1) * maxV);
      if (numOfTickets2 - numOfTickets < 3) {
        break;
      }
      numOfLeaderships++;
      numOfTickets = numOfTickets2;
    }
    let remainingValue = (v + numOfLeaderships * maxV) % 400;
    return [numOfLeaderships, numOfTickets, remainingValue];
  };
  const value = Math.round(item[1]);
  const value2 = Math.round(item[1] + item[2] / 5);
  const [numOfLeaderships, numOfTickets, remainingValue] = calc(value, item[2]);
  const [numOfLeaderships2, numOfTickets2, remainingValue2] = calc(
    value2,
    item[2]
  );
  return (
    <tr
      className={classNames(
        { hippo: isHippoHour(item[0]) },
        { XpColosseum: isXpColosseum(item[0]) },
        { MercilessXp: isMercilessXp(item[0]) },
        { XpBonanza: isXpBonanza(item[0]) }
      )}
    >
      <td id={id} className={classNames("time")} onClick={onChange}>
        {strDate(item[0])}
      </td>
      <td>
        <div className="parent">
          <div className="beforeMain">
            {value > item[2] ? value - item[2] : ""}
          </div>
          <div className="main">
            <input
              type="number"
              name={id}
              className="value"
              value={value}
              onChange={onChange}
            />
          </div>
          <div className="numOfLeaderships">{numOfLeaderships}</div>
          <div className="numOfTickets">{numOfTickets}</div>
          <div className="remainingValue">{remainingValue}</div>
        </div>
      </td>
      <td>
        <div className="parent">
          <div className="beforeMain">
            {value2 > item[2] ? value2 - item[2] : ""}
          </div>
          <div className="main">
            <input
              type="number"
              name={id}
              className="value2"
              value={value2}
              onChange={onChange}
            />
          </div>
          <div className="numOfLeaderships">{numOfLeaderships2}</div>
          <div className="numOfTickets">{numOfTickets2}</div>
          <div className="remainingValue">{remainingValue2}</div>
        </div>
      </td>
    </tr>
  );
}
