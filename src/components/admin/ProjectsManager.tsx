import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Project, ProjectInsert, ProjectUpdate } from '@/types/database';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { Plus, Pencil, Trash2, Upload, Loader2 } from 'lucide-react';

const ProjectsManager = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [projectToDelete, setProjectToDelete] = useState<Project | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState<ProjectInsert>({
    title: '',
    category: '',
    year: '',
    image_url: '',
    display_order: 0,
  });

  const fetchProjects = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to fetch projects',
        variant: 'destructive',
      });
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenDialog = (project?: Project) => {
    if (project) {
      setEditingProject(project);
      setFormData({
        title: project.title,
        category: project.category,
        year: project.year,
        image_url: project.image_url || '',
        display_order: project.display_order,
      });
    } else {
      setEditingProject(null);
      setFormData({
        title: '',
        category: '',
        year: new Date().getFullYear().toString(),
        image_url: '',
        display_order: projects.length,
      });
    }
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingProject(null);
    setFormData({
      title: '',
      category: '',
      year: '',
      image_url: '',
      display_order: 0,
    });
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Error',
        description: 'Please select an image file',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Image must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    setIsUploading(true);

    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}.${fileExt}`;
    const filePath = `projects/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(filePath, file);

    if (uploadError) {
      toast({
        title: 'Error',
        description: 'Failed to upload image',
        variant: 'destructive',
      });
      setIsUploading(false);
      return;
    }

    const { data: publicUrlData } = supabase.storage
      .from('project-images')
      .getPublicUrl(filePath);

    setFormData((prev) => ({ ...prev, image_url: publicUrlData.publicUrl }));
    setIsUploading(false);

    toast({
      title: 'Success',
      description: 'Image uploaded successfully',
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    if (editingProject) {
      // Update existing project
      const updateData: ProjectUpdate = {
        title: formData.title,
        category: formData.category,
        year: formData.year,
        image_url: formData.image_url || null,
        display_order: formData.display_order,
      };

      const { error } = await supabase
        .from('projects')
        .update(updateData)
        .eq('id', editingProject.id);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to update project',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Project updated successfully',
        });
        handleCloseDialog();
        fetchProjects();
      }
    } else {
      // Create new project
      const insertData: ProjectInsert = {
        title: formData.title,
        category: formData.category,
        year: formData.year,
        image_url: formData.image_url || null,
        display_order: formData.display_order,
      };

      const { error } = await supabase.from('projects').insert(insertData);

      if (error) {
        toast({
          title: 'Error',
          description: 'Failed to create project',
          variant: 'destructive',
        });
      } else {
        toast({
          title: 'Success',
          description: 'Project created successfully',
        });
        handleCloseDialog();
        fetchProjects();
      }
    }

    setIsSaving(false);
  };

  const handleDelete = async () => {
    if (!projectToDelete) return;

    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectToDelete.id);

    if (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete project',
        variant: 'destructive',
      });
    } else {
      toast({
        title: 'Success',
        description: 'Project deleted successfully',
      });
      fetchProjects();
    }

    setIsDeleteDialogOpen(false);
    setProjectToDelete(null);
  };

  const openDeleteDialog = (project: Project) => {
    setProjectToDelete(project);
    setIsDeleteDialogOpen(true);
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <Skeleton className="h-48 w-full" />
              <CardContent className="pt-4">
                <Skeleton className="h-6 w-3/4 mb-2" />
                <Skeleton className="h-4 w-1/2" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Manage Projects</h2>
        <Button onClick={() => handleOpenDialog()}>
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>

      {projects.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground">No projects yet. Add your first project!</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {projects.map((project) => (
            <Card key={project.id} className="overflow-hidden">
              {project.image_url && (
                <div className="aspect-video overflow-hidden">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {project.category} • {project.year}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleOpenDialog(project)}
                  >
                    <Pencil className="mr-2 h-3 w-3" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openDeleteDialog(project)}
                  >
                    <Trash2 className="mr-2 h-3 w-3" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Project Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingProject ? 'Edit Project' : 'Add New Project'}
            </DialogTitle>
            <DialogDescription>
              {editingProject
                ? 'Update the project details below.'
                : 'Fill in the details for your new project.'}
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, title: e.target.value }))
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, category: e.target.value }))
                }
                placeholder="e.g., Fine Art, Editorial, Portrait"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="year">Year</Label>
              <Input
                id="year"
                value={formData.year}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, year: e.target.value }))
                }
                placeholder="e.g., 2024"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="display_order">Display Order</Label>
              <Input
                id="display_order"
                type="number"
                value={formData.display_order}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    display_order: parseInt(e.target.value) || 0,
                  }))
                }
              />
            </div>

            <div className="space-y-2">
              <Label>Image</Label>
              {formData.image_url && (
                <div className="mb-2">
                  <img
                    src={formData.image_url}
                    alt="Preview"
                    className="w-full h-32 object-cover rounded-md"
                  />
                </div>
              )}
              <div className="flex gap-2">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                  className="hidden"
                  id="image-upload"
                />
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => document.getElementById('image-upload')?.click()}
                  disabled={isUploading}
                  className="w-full"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Uploading...
                    </>
                  ) : (
                    <>
                      <Upload className="mr-2 h-4 w-4" />
                      Upload Image
                    </>
                  )}
                </Button>
              </div>
              <Input
                placeholder="Or enter image URL"
                value={formData.image_url || ''}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, image_url: e.target.value }))
                }
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCloseDialog}>
                Cancel
              </Button>
              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : editingProject ? (
                  'Update'
                ) : (
                  'Create'
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the project
              "{projectToDelete?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProjectsManager;
