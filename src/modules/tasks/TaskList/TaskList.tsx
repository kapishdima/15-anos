import React from 'react';
import { TaskCard } from './TaskCard';

import MockTaskIcon from '../../../image/icons/task-icon.svg';

export const TaskList: React.FC = () => {
  return (
    <div className="task-list">
      <div className="task-list__month">April</div>
      <div className="task-list__group">
        <div className="task-list__group-title">Today</div>
        <TaskCard id="1" name="Choose the event date" image={MockTaskIcon} completed />
        <TaskCard id="1" name="Set the estimated budget" image={MockTaskIcon} completed />
        <TaskCard id="1" name="Start planing the wedding" image={MockTaskIcon} completed />
      </div>
      <div className="task-list__group">
        <div className="task-list__group-title">Saturday, 15 April 2023</div>
        <TaskCard id="1" name="Define the number of guests" image={MockTaskIcon} />
      </div>
      <div className="task-list__group">
        <div className="task-list__group-title">Thursday, 20 April 2023</div>
        <TaskCard id="1" name="Make the guest list" image={MockTaskIcon} completed />
      </div>
      <div className="task-list__group">
        <div className="task-list__group-title">Saturday, 29 April 2023</div>
        <TaskCard id="1" name="Search for ad wedding planner" image={MockTaskIcon} completed />
      </div>
      <div className="task-list__month">May</div>
      <div className="task-list__group">
        <div className="task-list__group-title">Thursday, 4 May 2023</div>
        <TaskCard id="1" name="Search for a loacation" image={MockTaskIcon} />
      </div>
      <div className="task-list__group">
        <div className="task-list__group-title">Thuesday, 9 May 2023</div>
        <TaskCard id="1" name="Search for a catering" image={MockTaskIcon} />
      </div>
      <div className="task-list__month">April</div>
      <div className="task-list__group">
        <div className="task-list__group-title">Today</div>
        <TaskCard id="1" name="Choose the event date" image={MockTaskIcon} completed />
        <TaskCard id="1" name="Set the estimated budget" image={MockTaskIcon} completed />
        <TaskCard id="1" name="Start planing the wedding" image={MockTaskIcon} completed />
      </div>
      <div className="task-list__group">
        <div className="task-list__group-title">Saturday, 15 April 2023</div>
        <TaskCard id="1" name="Define the number of guests" image={MockTaskIcon} />
      </div>
      <div className="task-list__group">
        <div className="task-list__group-title">Thursday, 20 April 2023</div>
        <TaskCard id="1" name="Make the guest list" image={MockTaskIcon} completed />
      </div>
      <div className="task-list__group">
        <div className="task-list__group-title">Saturday, 29 April 2023</div>
        <TaskCard id="1" name="Search for ad wedding planner" image={MockTaskIcon} completed />
      </div>
      <div className="task-list__month">May</div>
      <div className="task-list__group">
        <div className="task-list__group-title">Thursday, 4 May 2023</div>
        <TaskCard id="1" name="Search for a loacation" image={MockTaskIcon} />
      </div>
      <div className="task-list__group">
        <div className="task-list__group-title">Thuesday, 9 May 2023</div>
        <TaskCard id="1" name="Search for a catering" image={MockTaskIcon} />
      </div>
    </div>
  );
};
