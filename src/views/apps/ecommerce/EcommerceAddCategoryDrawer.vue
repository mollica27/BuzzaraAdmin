<script setup lang="ts">
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Underline } from '@tiptap/extension-underline'
import { StarterKit } from '@tiptap/starter-kit'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import { PerfectScrollbar } from 'vue3-perfect-scrollbar'

import { VForm } from 'vuetify/components/VForm'

interface Props {
  isDrawerOpen: boolean
}

interface Emit {
  (e: 'update:isDrawerOpen', value: boolean): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emit>()

const handleDrawerModelValueUpdate = (val: boolean) => {
  emit('update:isDrawerOpen', val)
}

const editor = useEditor({
  content: '',
  extensions: [
    StarterKit,
    Image,
    Placeholder.configure({
      placeholder: 'Write a Comment...',
    }),
    Underline,
    Link.configure(
      {
        openOnClick: false,
      },
    ),
  ],
})

const setLink = () => {
  const previousUrl = editor.value?.getAttributes('link').href
  // eslint-disable-next-line no-alert
  const url = window.prompt('URL', previousUrl)

  // cancelled
  if (url === null)
    return

  // empty
  if (url === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()

    return
  }

  // update link
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

const addImage = () => {
  // eslint-disable-next-line no-alert
  const url = window.prompt('URL')

  if (url)
    editor.value?.chain().focus().setImage({ src: url }).run()
}

const refVForm = ref<VForm>()
const categoryTitle = ref()
const categorySlug = ref()
const categoryImg = ref()
const parentCategory = ref()
const parentStatus = ref()

const resetForm = () => {
  emit('update:isDrawerOpen', false)
  refVForm.value?.reset()
  editor.value?.commands.clearContent()
}
</script>

<template>
  <VNavigationDrawer
    data-allow-mismatch
    :model-value="props.isDrawerOpen"
    temporary
    location="end"
    width="370"
    class="category-navigation-drawer scrollable-content"
    border="none"
    @update:model-value="handleDrawerModelValueUpdate"
  >
    <!-- 👉 Header -->
    <AppDrawerHeaderSection
      title="Add Category"
      @cancel="$emit('update:isDrawerOpen', false)"
    />

    <VDivider />

    <PerfectScrollbar :options="{ wheelPropagation: false }">
      <VCard flat>
        <VCardText>
          <VForm
            ref="refVForm"
            @submit.prevent=""
          >
            <VRow>
              <VCol cols="12">
                <VTextField
                  v-model="categoryTitle"
                  label="Title"
                  :rules="[requiredValidator]"
                  placeholder="Fashion"
                />
              </VCol>

              <VCol cols="12">
                <VTextField
                  v-model="categorySlug"
                  label="Slug"
                  :rules="[requiredValidator]"
                  placeholder="Trends fashion"
                />
              </VCol>

              <VCol cols="12">
                <VFileInput
                  v-model="categoryImg"
                  prepend-icon=""
                  :rules="[requiredValidator]"
                  density="compact"
                  label="No file chosen"
                  clearable
                >
                  <template #append>
                    <VBtn variant="outlined">
                      Choose
                    </VBtn>
                  </template>
                </VFileInput>
              </VCol>

              <VCol cols="12">
                <VSelect
                  v-model="parentCategory"
                  :rules="[requiredValidator]"
                  label="Parent Category"
                  placeholder="Select Parent Category"
                  :items="['HouseHold', 'Management', 'Electronics', 'Office', 'Accessories']"
                />
              </VCol>

              <VCol cols="12">
                <div class="tiptap-editor-wrapper rounded-lg pt-1 pb-2 px-2">
                  <EditorContent :editor="editor" />
                  <div
                    v-if="editor"
                    class="d-flex justify-end flex-wrap gap-x-2"
                  >
                    <VIcon
                      icon="ri-bold"
                      :color="editor.isActive('bold') ? 'primary' : ''"
                      size="20"
                      @click="editor.chain().focus().toggleBold().run()"
                    />

                    <VIcon
                      :color="editor.isActive('italic') ? 'primary' : ''"
                      icon="ri-italic"
                      size="20"
                      @click="editor.chain().focus().toggleItalic().run()"
                    />

                    <VIcon
                      :color="editor.isActive('underline') ? 'primary' : ''"
                      icon="ri-underline"
                      size="20"
                      @click="editor.commands.toggleUnderline()"
                    />

                    <VIcon
                      :color="editor.isActive('bulletList') ? 'primary' : ''"
                      icon="ri-list-check"
                      size="20"
                      @click="editor.chain().focus().toggleBulletList().run()"
                    />

                    <VIcon
                      :color="editor.isActive('orderedList') ? 'primary' : ''"
                      icon="ri-list-ordered-2"
                      size="20"
                      @click="editor.chain().focus().toggleOrderedList().run()"
                    />

                    <VIcon
                      icon="ri-links-line"
                      size="20"
                      @click="setLink"
                    />

                    <VIcon
                      icon="ri-image-line"
                      size="20"
                      @click="addImage"
                    />
                  </div>
                </div>
              </VCol>

              <VCol cols="12">
                <VSelect
                  v-model="parentStatus"
                  :rules="[requiredValidator]"
                  placeholder="Select Category Status"
                  label="Parent Status"
                  :items="['Published', 'Inactive', 'Scheduled']"
                />
              </VCol>

              <VCol cols="12">
                <div class="d-flex justify-start">
                  <VBtn
                    type="submit"
                    color="primary"
                    class="me-4"
                  >
                    Add
                  </VBtn>
                  <VBtn
                    color="error"
                    variant="outlined"
                    @click="resetForm"
                  >
                    Discard
                  </VBtn>
                </div>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </PerfectScrollbar>
  </VNavigationDrawer>
</template>

<style lang="scss">
.category-navigation-drawer {
  .ProseMirror {
    padding: 0.5rem;
    block-size: auto;
    min-block-size: 6.25rem;

    p {
      margin-block-end: 0;
    }

    p.is-editor-empty:first-child::before {
      block-size: 0;
      color: #adb5bd;
      content: attr(data-placeholder);
      float: inline-start;
      pointer-events: none;
    }
  }

  .is-active {
    border-color: rgba(var(--v-theme-primary), var(--v-border-opacity)) !important;
    background-color: rgba(var(--v-theme-primary), var(--v-activated-opacity));
    color: rgb(var(--v-theme-primary));
  }

  .ProseMirror-focused {
    outline: none !important;
  }

  .tiptap-editor-wrapper {
    border: 1px solid rgba(var(--v-border-color), 0.22);

    &:hover {
      border-color: rgba(var(--v-border-color), 0.6);
    }
  }
}
</style>
