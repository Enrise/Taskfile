

function subtaskfile { # use: subtaskfile $SUBTASK_NAME $SUBTASKFILE_PATH
  SUBTASKFILE_TASK="$1" && shift
  SUBTASKFILE_DIR="$1" && shift
  TASKFILE_FILE="$SUBTASKFILE_DIR/SubTaskfile"

  task:"${@-help}"
}
