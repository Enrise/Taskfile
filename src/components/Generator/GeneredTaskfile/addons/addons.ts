import { GeneratorSettings } from '@/components/Generator';
import { TaskfileAddons } from '@/components/Generator/GeneredTaskfile/taskfile';

import runtime from './runtime';
import git from './git';
import localHosts from './localHosts';
import subTaskfile from './subTaskfile';
import fileUtilities from './fileUtilities';
import appUtilities from '@/components/Generator/GeneredTaskfile/addons/appUtilities';

/**
 * Render addons for the Taskfile based on the generator settings
 *
 * @param settings Generator settings based on selected settings in the UI
 * @param addons Object reference you can extend by pushing elements to its arrays
 */
const renderAddons = (settings: GeneratorSettings, addons: TaskfileAddons): void => {
	runtime(settings, addons);
	git(settings, addons);
	localHosts(settings, addons);
	fileUtilities(settings, addons);
	appUtilities(settings, addons);
	subTaskfile(settings, addons);
};

export default renderAddons;
