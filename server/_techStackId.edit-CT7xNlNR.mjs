import { i as __toESM } from "./_runtime.mjs";
import { mt as require_react, pt as require_jsx_runtime } from "./_libs/@base-ui/react+[...].mjs";
import { C as IconPlus, l as IconTrash, q as IconGripVertical } from "./_libs/tabler__icons-react.mjs";
import { b as PROFICIENCY_LABELS, x as PROFICIENCY_LEVELS } from "./_ssr/auth-DYlFpf9M.mjs";
import { t as Button$1 } from "./_ssr/button-Byofh5wQ.mjs";
import { h as useRouter } from "./_libs/@tanstack/react-router+[...].mjs";
import { t as useForm } from "./_libs/@tanstack/react-form+[...].mjs";
import { n as globalSuccessToast, t as globalErrorToast } from "./_ssr/toasts-jr2byFtO.mjs";
import { i as useSuspenseQuery, s as useQueryClient, t as useMutation } from "./_libs/tanstack__react-query.mjs";
import { r as trpc } from "./_ssr/trpc-BmBe4ExZ.mjs";
import { t as Separator$1 } from "./_ssr/separator-DENx5VjH.mjs";
import { a as FieldLabel, i as FieldGroup, o as Spinner, r as FieldError, t as Field } from "./_ssr/spinner-D1JR_mQq.mjs";
import { t as Input$1 } from "./_ssr/input-S9SQN3Mi.mjs";
import { t as ScrollArea$1 } from "./_ssr/scroll-area-DTrDwLXS.mjs";
import { a as SelectValue, i as SelectTrigger, n as SelectContent, r as SelectItem, t as Select$1 } from "./_ssr/select-DywxwuYX.mjs";
import { a as closestCenter, h as CSS, i as PointerSensor, m as useSensors, p as useSensor, r as KeyboardSensor, t as DndContext } from "./_libs/@dnd-kit/core+[...].mjs";
import { a as useSortable, i as sortableKeyboardCoordinates, n as arrayMove, o as verticalListSortingStrategy, t as SortableContext } from "./_libs/dnd-kit__sortable.mjs";
import { t as Route } from "./_techStackId.edit-ChkytRUw.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_techStackId.edit-CT7xNlNR.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SortableItem({ item, index, onNameChange, onProficiencyChange, onRemove, nameError }) {
	const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: item._id });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: setNodeRef,
		style: {
			transform: CSS.Transform.toString(transform),
			transition,
			opacity: isDragging ? .5 : 1
		},
		className: "border-border bg-card flex items-center gap-2 rounded-md border px-3 py-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "text-muted-foreground/40 hover:text-muted-foreground shrink-0 cursor-grab active:cursor-grabbing",
				...attributes,
				...listeners,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconGripVertical, { className: "size-4" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col gap-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
					value: item.name,
					onChange: (e) => onNameChange(e.target.value),
					placeholder: `Item ${index + 1}`,
					className: "h-7 text-sm",
					"aria-invalid": !!nameError
				}), nameError && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-destructive text-xs",
					children: nameError
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
				value: String(item.proficiency),
				onValueChange: (v) => onProficiencyChange(Number(v)),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
					className: "h-7 w-46 shrink-0 text-xs",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: PROFICIENCY_LEVELS.map((level) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SelectItem, {
					value: String(level),
					className: "text-xs",
					children: [
						"Proficiency ",
						level,
						" · ",
						PROFICIENCY_LABELS[level]
					]
				}, level)) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
				type: "button",
				variant: "ghost",
				size: "icon",
				className: "text-muted-foreground hover:text-destructive size-7 shrink-0",
				onClick: onRemove,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconTrash, { className: "size-3.5" })
			})
		]
	});
}
function RouteComponent() {
	const queryClient = useQueryClient();
	const router = useRouter();
	const dndId = (0, import_react.useId)();
	const { techStackId } = Route.useParams();
	const { data: category } = useSuspenseQuery(trpc.techStack.getById.queryOptions({ id: techStackId }));
	const updateMutation = useMutation(trpc.techStack.updateCategoryWithItems.mutationOptions({
		onSuccess: async () => {
			await queryClient.invalidateQueries(trpc.techStack.getForDashboard.queryFilter());
			await queryClient.invalidateQueries(trpc.techStack.getById.queryFilter());
			globalSuccessToast("Tech stack category updated!");
			router.history.back();
		},
		onError: (err) => globalErrorToast(err.message)
	}));
	const form = useForm({
		defaultValues: {
			name: category.name,
			items: category.items.map((item) => ({
				_id: item.id,
				id: item.id,
				name: item.name,
				proficiency: item.proficiency
			}))
		},
		onSubmit: async ({ value }) => {
			await updateMutation.mutateAsync({
				id: techStackId,
				name: value.name,
				items: value.items.map(({ _id: _, ...item }, index) => ({
					...item,
					order: index
				}))
			});
		}
	});
	const sensors = useSensors(useSensor(PointerSensor), useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-[calc(100svh-var(--header-height)-2rem)] flex-1 flex-col gap-4",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-col gap-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-foreground text-base font-bold",
				children: "Edit Tech Stack Category"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted-foreground text-xs",
				children: "Update the category name and manage its items."
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "flex flex-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				},
				className: "flex w-full flex-1 flex-col overflow-hidden",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ScrollArea$1, {
						className: "min-h-0 flex-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldGroup, {
								className: "gap-6",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
									name: "name",
									children: (field) => {
										const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
											"data-invalid": isInvalid,
											className: "flex flex-col gap-1.5",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
													htmlFor: field.name,
													children: "Category Name"
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
													id: field.name,
													value: field.state.value,
													onBlur: field.handleBlur,
													onChange: (e) => field.handleChange(e.target.value),
													"aria-invalid": isInvalid,
													placeholder: "e.g. Frontend, DevOps"
												}),
												isInvalid && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldError, { errors: field.state.meta.errors })
											]
										});
									}
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Field, {
									name: "items",
									children: (field) => {
										const items = field.state.value;
										function handleDragEnd(event) {
											const { active, over } = event;
											if (!over || active.id === over.id) return;
											const oldIndex = items.findIndex((i) => i._id === active.id);
											const newIndex = items.findIndex((i) => i._id === over.id);
											if (oldIndex === -1 || newIndex === -1) return;
											field.handleChange(arrayMove(items, oldIndex, newIndex));
										}
										function addItem() {
											field.handleChange([...items, {
												_id: crypto.randomUUID(),
												name: "",
												proficiency: 1,
												id: ""
											}]);
										}
										function removeItem(index) {
											field.handleChange(items.filter((_, i) => i !== index));
										}
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
											className: "flex flex-col gap-2",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex items-center justify-between",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Items" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-muted-foreground text-xs",
														children: "Drag to reorder · Press Enter to add"
													})]
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DndContext, {
													id: dndId,
													sensors,
													collisionDetection: closestCenter,
													onDragEnd: handleDragEnd,
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableContext, {
														items: items.map((i) => i._id),
														strategy: verticalListSortingStrategy,
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "flex flex-col gap-1.5",
															children: items.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SortableItem, {
																item,
																index,
																onNameChange: (value) => field.handleChange(items.map((it, i) => i === index ? {
																	...it,
																	name: value
																} : it)),
																onProficiencyChange: (value) => field.handleChange(items.map((it, i) => i === index ? {
																	...it,
																	proficiency: value
																} : it)),
																onRemove: () => removeItem(index)
															}, item._id))
														})
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
													type: "button",
													variant: "outline",
													className: "w-full border-dashed",
													onClick: addItem,
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconPlus, { className: "size-4" }), "Add item"]
												})
											]
										});
									}
								})]
							})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator$1, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
						className: "flex shrink-0 items-center justify-end gap-2 p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
							type: "button",
							variant: "outline",
							onClick: () => router.history.back(),
							children: "Cancel"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(form.Subscribe, {
							selector: (state) => state.isSubmitting,
							children: (isSubmitting) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button$1, {
								type: "submit",
								disabled: isSubmitting,
								children: [isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, { "data-icon": "inline-start" }) : null, "Save Changes"]
							})
						})]
					})
				]
			})
		})]
	});
}
//#endregion
export { RouteComponent as component };
