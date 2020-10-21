import React, {useEffect} from 'react';
import { Col,Row} from 'reactstrap';
//import {TinyDatePicker} from 'tiny-date-picker/dist/date-range-picker'
import {DateRangePicker} from 'tiny-date-picker/dist/date-range-picker';
import "./utils.css"
import moment from 'moment'
const DatePicker=({startRef,endRef})=>{
useEffect(()=>{
    const root = document.querySelector('.ex-inputs');
    const txtStart = root.querySelector('.ex-inputs-start');
    const txtEnd = root.querySelector('.ex-inputs-end');
    const container = root.querySelector('.ex-inputs-picker');
    const lang= {
        days: ['Dom', 'Lun', 'Mar', 'Mie', 'Jue', 'Vie', 'Sab'],
        months: [
          'Enero',
          'Febrero',
          'Marzo',
          'Abril',
          'Mayo',
          'Junio',
          'Julio',
          'Agosto',
          'Septiembre',
          'Octubre',
          'Noviembre',
          'Diciembre',
        ],
        today: 'Hoy',
        clear: 'Limpiar',
        close: 'Cerrar',
      }
    const options={

        startOpts:{lang},
        endOpts:{lang}

    }

    const dpaux=DateRangePicker(container,options)
    // Add an event handler
    dpaux.on('statechange', (_, picker) => {
      if (picker.state.start){
        txtStart.value=moment(picker.state.start).format("DD/MM/YYYY");
      }
      if (picker.state.end){
        
        txtEnd.value=moment(picker.state.end).format("DD/MM/YYYY");

        let previousTimeout;
        clearTimeout(previousTimeout);
        previousTimeout = setTimeout(function() {
        container.classList.remove('ex-inputs-picker-visible');
      }, 10);

      }
    });
    // When the inputs gain focus, show the date range picker
    txtStart.addEventListener('focus', showPicker);
    txtEnd.addEventListener('focus', showPicker);

    function showPicker() {
      container.classList.add('ex-inputs-picker-visible');
    }

    // If focus leaves the root element, it is not in the date
    // picker or the inputs, so we should hide the date picker
    // we do this in a setTimeout because redraws cause temporary
    // loss of focus.
    let previousTimeout;
    root.addEventListener('focusout', function hidePicker() {
      clearTimeout(previousTimeout);
      previousTimeout = setTimeout(function() {
        if (!root.contains(document.activeElement)) {
          container.classList.remove('ex-inputs-picker-visible');
        }
      }, 10);
    });

},[])
return(
    <React.Fragment>
    <div className="date-range-examples">
<div className="ex-inputs">
  <header className="ex-inputs-header">
  <Row>
    <Col xs={12} md={{size:4,offset:2}}> <h4 style={{textAlign:"left",marginBottom:"5px"}}>Fecha desde</h4><input  ref={startRef}className="ex-inputs-start"  /></Col>
    <Col xs={12} md={4}> <h4 style={{textAlign:"left",marginBottom:"5px"}}>Fecha hasta</h4><input ref={endRef} className="ex-inputs-end"  /></Col>
  </Row>
  </header>
  <div className="ex-inputs-picker"><div className="dr-cals"><div className="dr-cal-start"><div className="dp-permanent"><div className="dp"><div className="dp-cal"><header className="dp-cal-header"><button tabIndex={-1} type="button" className="dp-prev">Prev</button><button tabIndex={-1} type="button" className="dp-cal-month">March</button><button tabIndex={-1} type="button" className="dp-cal-year">2020</button><button tabIndex={-1} type="button" className="dp-next">Next</button></header><div className="dp-days"><span className="dp-col-header">Sun</span><span className="dp-col-header">Mon</span><span className="dp-col-header">Tue</span><span className="dp-col-header">Wed</span><span className="dp-col-header">Thu</span><span className="dp-col-header">Fri</span><span className="dp-col-header">Sat</span><button tabIndex={-1} type="button" className="dp-day " data-date={1583031600000}>1</button><button tabIndex={-1} type="button" className="dp-day " data-date={1583118000000}>2</button><button tabIndex={-1} type="button" className="dp-day " data-date={1583204400000}>3</button><button tabIndex={-1} type="button" className="dp-day " data-date={1583290800000}>4</button><button tabIndex={-1} type="button" className="dp-day " data-date={1583377200000}>5</button><button tabIndex={-1} type="button" className="dp-day " data-date={1583463600000}>6</button><button tabIndex={-1} type="button" className="dp-day " data-date={1583550000000}>7</button><button tabIndex={-1} type="button" className="dp-day " data-date={1583636400000}>8</button><button tabIndex={-1} type="button" className="dp-day " data-date={1583722800000}>9</button><button tabIndex={-1} type="button" className="dp-day " data-date={1583809200000}>10</button><button tabIndex={-1} type="button" className="dp-day " data-date={1583895600000}>11</button><button tabIndex={-1} type="button" className="dp-day " data-date={1583982000000}>12</button><button tabIndex={-1} type="button" className="dp-day " data-date={1584068400000}>13</button><button tabIndex={-1} type="button" className="dp-day " data-date={1584154800000}>14</button><button tabIndex={-1} type="button" className="dp-day " data-date={1584241200000}>15</button><button tabIndex={-1} type="button" className="dp-day " data-date={1584327600000}>16</button><button tabIndex={-1} type="button" className="dp-day " data-date={1584414000000}>17</button><button tabIndex={-1} type="button" className="dp-day " data-date={1584500400000}>18</button><button tabIndex={-1} type="button" className="dp-day " data-date={1584586800000}>19</button><button tabIndex={-1} type="button" className="dp-day " data-date={1584673200000}>20</button><button tabIndex={-1} type="button" className="dp-day " data-date={1584759600000}>21</button><button tabIndex={-1} type="button" className="dp-day " data-date={1584846000000}>22</button><button tabIndex={-1} type="button" className="dp-day dp-current dp-selected dp-day-today " data-date={1584932400000}>23</button><button tabIndex={-1} type="button" className="dp-day " data-date={1585018800000}>24</button><button tabIndex={-1} type="button" className="dp-day " data-date={1585105200000}>25</button><button tabIndex={-1} type="button" className="dp-day " data-date={1585191600000}>26</button><button tabIndex={-1} type="button" className="dp-day " data-date={1585278000000}>27</button><button tabIndex={-1} type="button" className="dp-day " data-date={1585364400000}>28</button><button tabIndex={-1} type="button" className="dp-day " data-date={1585450800000}>29</button><button tabIndex={-1} type="button" className="dp-day " data-date={1585537200000}>30</button><button tabIndex={-1} type="button" className="dp-day " data-date={1585623600000}>31</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1585710000000}>1</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1585796400000}>2</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1585882800000}>3</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1585969200000}>4</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1586055600000}>5</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1586142000000}>6</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1586228400000}>7</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1586314800000}>8</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1586401200000}>9</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1586487600000}>10</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1586574000000}>11</button></div><footer className="dp-cal-footer"><button tabIndex={-1} type="button" className="dp-today">Today</button><button tabIndex={-1} type="button" className="dp-clear">Clear</button><button tabIndex={-1} type="button" className="dp-close">Close</button></footer></div></div></div></div><div className="dr-cal-end"><div className="dp-permanent"><div className="dp"><div className="dp-cal"><header className="dp-cal-header"><button tabIndex={-1} type="button" className="dp-prev">Prev</button><button tabIndex={-1} type="button" className="dp-cal-month">April</button><button tabIndex={-1} type="button" className="dp-cal-year">2020</button><button tabIndex={-1} type="button" className="dp-next">Next</button></header><div className="dp-days"><span className="dp-col-header">Sun</span><span className="dp-col-header">Mon</span><span className="dp-col-header">Tue</span><span className="dp-col-header">Wed</span><span className="dp-col-header">Thu</span><span className="dp-col-header">Fri</span><span className="dp-col-header">Sat</span><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1585450800000}>29</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1585537200000}>30</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1585623600000}>31</button><button tabIndex={-1} type="button" className="dp-day " data-date={1585710000000}>1</button><button tabIndex={-1} type="button" className="dp-day " data-date={1585796400000}>2</button><button tabIndex={-1} type="button" className="dp-day " data-date={1585882800000}>3</button><button tabIndex={-1} type="button" className="dp-day " data-date={1585969200000}>4</button><button tabIndex={-1} type="button" className="dp-day " data-date={1586055600000}>5</button><button tabIndex={-1} type="button" className="dp-day " data-date={1586142000000}>6</button><button tabIndex={-1} type="button" className="dp-day " data-date={1586228400000}>7</button><button tabIndex={-1} type="button" className="dp-day " data-date={1586314800000}>8</button><button tabIndex={-1} type="button" className="dp-day " data-date={1586401200000}>9</button><button tabIndex={-1} type="button" className="dp-day " data-date={1586487600000}>10</button><button tabIndex={-1} type="button" className="dp-day " data-date={1586574000000}>11</button><button tabIndex={-1} type="button" className="dp-day " data-date={1586660400000}>12</button><button tabIndex={-1} type="button" className="dp-day " data-date={1586746800000}>13</button><button tabIndex={-1} type="button" className="dp-day " data-date={1586833200000}>14</button><button tabIndex={-1} type="button" className="dp-day " data-date={1586919600000}>15</button><button tabIndex={-1} type="button" className="dp-day " data-date={1587006000000}>16</button><button tabIndex={-1} type="button" className="dp-day " data-date={1587092400000}>17</button><button tabIndex={-1} type="button" className="dp-day " data-date={1587178800000}>18</button><button tabIndex={-1} type="button" className="dp-day " data-date={1587265200000}>19</button><button tabIndex={-1} type="button" className="dp-day " data-date={1587351600000}>20</button><button tabIndex={-1} type="button" className="dp-day " data-date={1587438000000}>21</button><button tabIndex={-1} type="button" className="dp-day " data-date={1587524400000}>22</button><button tabIndex={-1} type="button" className="dp-day dp-current dp-selected " data-date={1587610800000}>23</button><button tabIndex={-1} type="button" className="dp-day " data-date={1587697200000}>24</button><button tabIndex={-1} type="button" className="dp-day " data-date={1587783600000}>25</button><button tabIndex={-1} type="button" className="dp-day " data-date={1587870000000}>26</button><button tabIndex={-1} type="button" className="dp-day " data-date={1587956400000}>27</button><button tabIndex={-1} type="button" className="dp-day " data-date={1588042800000}>28</button><button tabIndex={-1} type="button" className="dp-day " data-date={1588129200000}>29</button><button tabIndex={-1} type="button" className="dp-day " data-date={1588215600000}>30</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1588302000000}>1</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1588388400000}>2</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1588474800000}>3</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1588561200000}>4</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1588647600000}>5</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1588734000000}>6</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1588820400000}>7</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1588906800000}>8</button><button tabIndex={-1} type="button" className="dp-day dp-edge-day " data-date={1588993200000}>9</button></div><footer className="dp-cal-footer"><button tabIndex={-1} type="button" className="dp-today">Today</button><button tabIndex={-1} type="button" className="dp-clear">Clear</button><button tabIndex={-1} type="button" className="dp-close">Close</button></footer></div></div></div></div></div></div>
</div>
</div>
</React.Fragment>
)
}

export default DatePicker