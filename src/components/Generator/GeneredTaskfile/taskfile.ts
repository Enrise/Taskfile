import { GeneratorSettings } from '@/components/Generator';
import buildHeaderFunction from './buildHeader';
import { renderUtilities } from './helpers';
import loadTemplate from '@/helpers/loadTemplate';
import taskfileBase from './taskfile-base.sh';
import customSection from './custom-section.sh';
import renderAddons from './addons';
import renderFragment from '@/helpers/renderFragment';

export type TaskfileAddons = {
	initCheckCommands: string[];
	preInitCommands: string[];
	postInitCommands: string[];
	projectFunctions: string[];
	startCommands: string[];
	updateCommands: string[];
	customSections: string[];
	utilityFunctions: string[];
	globals: string[];
};

export const taskfile = (settings: GeneratorSettings): string => {
	const addons: TaskfileAddons = {
		initCheckCommands: [],
		preInitCommands: [],
		postInitCommands: [],
		projectFunctions: [],
		startCommands: [],
		updateCommands: [],
		customSections: [],
		utilityFunctions: [],
		globals: [],
	};

	renderAddons(settings, addons);

	return loadTemplate(taskfileBase, {
		header: buildHeaderFunction(settings.project || 'Taskfile', settings.font),
		initCheckCommands: renderFragment(
			addons.initCheckCommands,
			`# Add checks to see if the project is ready for initialisation`,
			true
		),
		preInitCommands: renderFragment(addons.preInitCommands, `# Add project preparation commands here`, true),
		postInitCommands: renderFragment(addons.postInitCommands, `# Finalize setting up the project`, true),
		startCommands: renderFragment(
			addons.startCommands,
			'title "Run development application"\n\t# TODO: Add start commands',
			true
		),
		updateCommands: renderFragment(
			addons.updateCommands,
			'title "Run project updates"\n\t# TODO: Add project update commands here',
			true
		),
		projectFunctions: renderFragment(addons.projectFunctions, '# Add more project specific functions here'),
		customSections: renderFragment(addons.customSections, loadTemplate(customSection)),
		utilitySection: renderUtilities(addons.utilityFunctions),
		globals: renderFragment(addons.globals, `# Define global variables here`),
	});
};
