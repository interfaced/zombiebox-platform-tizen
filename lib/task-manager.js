/*
 * This file is part of the ZombieBox package.
 *
 * Copyright © 2015-2019, Interfaced
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

/**
 */
export default class TaskManager {
	/**
	 */
	constructor() {
		/**
		 * @type {Array<TaskRecord>}
		 * @protected
		 */
		this._taskQueue = [];

		/**
		 * @type {?Promise}
		 * @protected
		 */
		this._currentTask = null;
	}

	/**
	 * @param {TaskCreator} creator
	 * @param {TaskType} type
	 */
	addTask(creator, type) {
		this._taskQueue = this._taskQueue.filter((record) => record.type !== type);
		this._taskQueue.push({creator, type});

		this._startNextTask();
	}

	/**
	 * @protected
	 */
	_startNextTask() {
		if (!this._currentTask) {
			const nextTaskRecord = this._taskQueue.shift();

			if (nextTaskRecord) {
				const onTaskDone = () => {
					this._currentTask = null;

					this._startNextTask();
				};

				this._currentTask = nextTaskRecord.creator()
					.then(onTaskDone, onTaskDone);
			}
		}
	}
}


/**
 * @enum {string}
 */
export const TaskType = {
	PLAY: 'play',
	STOP: 'stop',
	SUSPEND: 'suspend'
};


/**
 * @typedef {function(): Promise}
 */
export let TaskCreator;


/**
 * @typedef {{
 *     creator: TaskCreator,
 *     type: TaskType
 * }}
 */
export let TaskRecord;
