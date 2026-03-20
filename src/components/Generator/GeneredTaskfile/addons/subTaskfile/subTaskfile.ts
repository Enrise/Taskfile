import { GeneratorSettings } from '@/components/Generator';
import { TaskfileAddons } from '@/components/Generator/GeneredTaskfile/taskfile';
import loadTemplate from '@/helpers/loadTemplate';
import subTaskfileProxyfunction from './sub-taskfile-proxy-function.sh';
import subtaskSection from './subtask-section.sh';

const subTaskfile = (settings: GeneratorSettings, addon: TaskfileAddons): void => {
	if (settings.subTaskfile) {
		addon.baseFunctions.push(loadTemplate(subTaskfileProxyfunction));

		addon.customSections.push(loadTemplate(subtaskSection));
	}
};

export default subTaskfile;
